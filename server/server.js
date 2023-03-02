// import the modules
import express from "express";
const app = express();
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

// import the database connection
import connectDB from "./mongodb/connect.js";

// import the models
import User from "./mongodb/models/user.model.js";

// import the routes
import router from "./router/route.js";

// This is the middleware to use the cors and express.json and dotenv
dotenv.config();
app.use(cors());
app.use(express.json());

// Less information about the server
app.disable("x-powered-by");

// This is the route to listen to the server
const { MONGODB_URL, PORT } = process.env;

const startServer = async () => {
  try {
    await connectDB(MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`🚀 Listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();

//A This is the route to check if the server is working
app.get("/", (req, res) => {
  res.send("Hello, The server is Working Fine 🚀");
});

// api routes
app.use("/api", router);

// openai api key and model id
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let context = "";

app.post("/api/message", async (req, res, next) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  try {
    console.log("Message:", message);
    const inputPrompt = `${context} ${message}`.trim();
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `
      I want you to reply to all my questions in markdown format. 
      Q: ${inputPrompt}?.
      A: `,
      max_tokens: 400,
      temperature: 0.7,
      top_p: 0.5,
      presence_penalty: 0.2,
      frequency_penalty: 0.5,
    });
    let generatedText = response.data.choices[0].text.trim();
    console.log("Generated text:", generatedText);
    if (!generatedText) {
      // check if generatedText is empty or null
      generatedText = "I'm sorry, I don't know the answer to that Question.";
    }
    context = `${context} ${generatedText}`.trim();

    res.json({ message: generatedText });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});
