import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();
import { Builder, By, Key, until } from "selenium-webdriver";
import { Options } from "selenium-webdriver/chrome.js";
import chalk from "chalk";
//! chatgpt-cloned
// openai configuration

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
let context = [];

async function getSummarizedContext(summaryText) {
  let inputContext, summaryToken;
  try {
    const summarizedContextWithHuggingface =
      await summarizeFunctionWithHuggingface(summaryText);
    inputContext = summarizedContextWithHuggingface.inputContext;
    summaryToken = summarizedContextWithHuggingface.summaryToken;
  } catch (error1) {
    console.log(chalk.red(`function 1 failed with error: ${error1}`));
    console.log(chalk.yellow("Trying function 2..."));
    try {
      const summarizedContextWithOpenAI = await summarizeFunctionWithOpenAI(
        summaryText
      );
      inputContext = summarizedContextWithOpenAI.inputContext;
      summaryToken = summarizedContextWithOpenAI.summaryToken;
    } catch (error2) {
      console.log(chalk.red(`function 2 failed with error: ${error2}`));
      console.log(chalk.red("Both summarization functions failed!"));
      throw new Error("Both summarization functions failed!");
    }
  }
  if (!inputContext || !summaryToken) {
    console.log(
      chalk.red("Summarization failed: missing input context or summary token")
    );
    throw new Error(
      "Summarization failed: missing input context or summary token"
    );
  }

  return { inputContext, summaryToken };
}
// function 1 implemented with huggingface
async function summarizeFunctionWithHuggingface(summaryText) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGING_API_STABLE_IMAGE}`,
      },
      method: "POST",
      body: JSON.stringify({
        inputs: `${summaryText}`,
        parameters: {
          length_penalty: 1.0,
          max_length: 300,
          min_length: 30,
        },
        model: "facebook/bart-large-cnn",
      }),
    }
  );

  const summaryContext = await response.json();
  const inputContext = summaryContext[0].summary_text
    .replace(/\s+/g, " ")
    .trim();
  console.log(
    chalk.green(
      "Input-Context after Summarization from HuggingFace: ",
      inputContext
    )
  );
  const summaryToken = Math.round(inputContext.length * 0.2);
  console.log(summaryToken);
  return {
    inputContext: inputContext,
    summaryToken: summaryToken,
  };
}
// function 2 implemented with openai
async function summarizeFunctionWithOpenAI(summaryText) {
  const summarizedContext = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are very professional copywriter",
      },
      {
        role: "user",
        content: `Please summarize the following context and capture the most important part ${summaryText}`,
      },
    ],
    max_tokens: 50,
    temperature: 0,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  const inputContext = summarizedContext.data.choices[0].message.content;
  const summaryToken = summarizedContext.data.usage.total_tokens;
  return { inputContext, summaryToken };
}

async function getChatResponse(
  inputPrompt,
  age,
  region,
  inputContext,
  summaryToken
) {
  const totalInput = `I am ${age} years old and live in ${region}. The summarized context of our previous conversation is ${inputContext} And I want to know about ${inputPrompt}`;
  console.log();
  console.log(
    chalk.blueBright("Total Input prompt for Chat Generation: ", totalInput)
  );
  console.log();
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an helpful Assistant. Answer shortly when chatting normally but answer well-informed when asked a question. And if you don't know the answer, say so.",
        },
        {
          role: "user",
          content: `${totalInput}`,
        },
      ],
      max_tokens: 1024,
      temperature: 0,
      presence_penalty: 0,
      frequency_penalty: 0,
    });
    const generatedText = response.data.choices[0].message;
    const chatToken = response.data.usage.total_tokens;
    console.log(chatToken);
    const tokenUsage = chatToken + summaryToken;
    console.log(tokenUsage);
    context.push(generatedText.content.slice(0, 500));
    if (context.length > 3) {
      context.shift();
    }
    return { message: generatedText, tokenUsage };
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded. Try again later.");
      throw new Error("Rate limit exceeded. Try again later.");
    } else {
      console.error(error.stack);
      throw new Error("Something went wrong!");
    }
  }
}

export async function chat(req, res) {
  try {
    const { messages, age, region } = req.body;
    let summaryText = context.join(" ");
    if (summaryText.trim() === "") {
      summaryText = "I am codepix your AI Assistant";
    }
    const contextData = await getSummarizedContext(summaryText);
    const inputContext = contextData.inputContext;
    const summaryToken = contextData.summaryToken;
    const inputPrompt = `${messages}`;
    const response = await getChatResponse(
      inputPrompt,
      age,
      region,
      inputContext,
      summaryToken
    );
    res.json(response);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded. Try again later.");
      throw new Error("Rate limit exceeded. Try again later.");
    } else {
      console.error(error.stack);
      throw new Error("Something went wrong!");
    }
  }
}

// google search implementation
export async function searchGoogle(req, res) {
  try {
    const driver = new Builder()
      .forBrowser("chrome")
      .setChromeOptions(new Options().headless())
      .build();
    const { messages } = req.body;
    console.log(messages);
    await driver.get("https://www.google.com");
    await driver.findElement(By.name("q")).sendKeys(messages, Key.RETURN);
    await driver.wait(until.titleContains(messages), 10000);
    const elements = await driver.findElements(
      By.className("VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc lEBKkf")
    );
    const urls = await driver.findElements(
      By.className("kvH3mc BToiNc UK95Uc")
    );
    const url = [];
    for (let i = 0; i < 5; i++) {
      const element = urls[i];
      const urlTags = await element.findElements(By.css("a"));
      const urlText = await urlTags[0].getAttribute("href");
      url.push(urlText);
    }

    const answer = [];
    for (let i = 0; i < 5; i++) {
      const element = elements[i];
      const answerText = await element.getText();
      answer.push(answerText);
    }
    await driver.quit();
    console.log(answer.join(""));
    const goForAnswerContext = answer.join("");
    const inputPrompt = `The context is ${goForAnswerContext} And I want to know about ${messages}`;
    const generateAnswer = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an helpful Assistant. Answer shortly and follow the context for finding the answer, then generate an factual answer.",
        },
        {
          role: "user",
          content: `${inputPrompt}`,
        },
      ],
      max_tokens: 200,
      temperature: 0.2,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
    });
    const generatedText = generateAnswer.data.choices[0].message;
    const chatToken = generateAnswer.data.usage.total_tokens;
    res.json({
      status: "Google Search Successful",
      message: generatedText,
      tokenUsage: chatToken,
      url: url,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// image searchng implementation in chat
export async function searchimage(req, res) {
  const { messages } = req.body;
  console.log(messages);
  try {
    async function query(data) {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/prompthero/openjourney",
        {
          headers: {
            Authorization: `Bearer ${process.env.HUGGING_API_STABLE_IMAGE}`,
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      if (response.ok) {
        const result = await response.blob();
        return result;
      } else {
        throw new Error(`API call failed with status ${response.status}`);
      }
    }

    try {
      const result = await query({
        inputs: messages,
      });
      console.log(result);
      console.log(result.type);
      const blobData = new Blob([result], { type: "image/jpeg" });
      const arrayBuffer = await blobData.arrayBuffer();
      const base64Image = Buffer.from(arrayBuffer).toString("base64");
      res.json({ image: base64Image });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
