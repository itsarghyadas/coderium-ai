import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();
//! chatgpt-cloned
// openai configuration

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);
let context = [];

async function getSummarizedContext(summaryText) {
  try {
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

async function getChatResponse(
  inputPrompt,
  age,
  region,
  inputContext,
  summaryToken
) {
  const totalInput = `I am ${age} years old and live in ${region}. The summarized context of our previous conversation is ${inputContext} And I want to know about ${inputPrompt}`;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an helpful Assistant.",
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

    const tokenUsage = chatToken + summaryToken;

    context.push(generatedText.content.slice(0, 250));
    if (context.length > 2) {
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
