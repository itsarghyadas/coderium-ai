// import the modules
import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

// import the database connection
import connectDB from "./mongodb/connect.js";

// import the models
import UserModel from "./mongodb/models/user.model.js";

// import the routes
import router from "./router/route.js";

// This is the middleware to use the cors and express.json and dotenv
dotenv.config();
app.use(cors());

// This is the middleware to use the express.json
app.use((req, res, next) => {
  if (req.originalUrl === "/api/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

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
app.use("/api", router); // This is the route to use the router

// This is the route to handle the chatbot
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
let context = "";

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages)
      return res.status(400).json({ error: "Message is required" });

    const inputPrompt = `${context} ${messages}`; // update input prompt;
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are helpful assistant and you have your own feeling, opinion and emotions",
        },
        {
          role: "user",
          content: `I want you to reply to all my questions in markdown format ${inputPrompt} `,
        },
      ],
      max_tokens: 520,
      temperature: 0.3,
    });

    let generatedText = response.data.choices[0].message;
    console.log(generatedText);
    let tokenUsage = response.data.usage.total_tokens;
    console.log(tokenUsage);
    context = `${context} ${generatedText.content}`; // update context

    res.json({ message: generatedText, tokenUsage: tokenUsage });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// This is the route to handle the payment on stripe
const storeItems = new Map([
  [1, { priceInCents: 8000, name: "Starter Package" }],
  [2, { priceInCents: 80000, name: "Pro Package" }],
]);
app.post("/api/checkout", async (req, res) => {
  try {
    const { userEmail } = req.body;
    console.log(userEmail);
    const loggedInUserEmail = userEmail;
    const session = await stripe.checkout.sessions.create({
      invoice_creation: { enabled: true },
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/completion?id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/dashboard`,
      customer_email: loggedInUserEmail,
    });
    const lineItems = req.body.items.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });
    res.json({ url: session.url, id: session.id, lineItems });
    console.log(lineItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// This is the route to handle the checkout session
/* app.get("/api/checkoutSession", async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.id);
  res.json(session);
}); */

// Stripe webhook secret from CLI
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
// This is the route to handle the webhook
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (request, response) => {
    let event = request.body;
    const signature = request.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const totalAmountMoney = session.amount_total;
      console.log(totalAmountMoney);

      let newToken = 10000;
      let upgradeToken;

      if (totalAmountMoney === 8000) {
        console.log("Starter Package");
        upgradeToken = newToken;
      } else if (totalAmountMoney === 16000) {
        console.log("Starter Package * 2");
        upgradeToken = newToken * 2;
      } else if (totalAmountMoney === 24000) {
        console.log("Starter Package * 3");
        upgradeToken = newToken * 3;
      } else if (totalAmountMoney === 80000) {
        console.log("Pro Package");
        upgradeToken = newToken * 10;
      }

      const customerEmail = session.customer_email;
      const user = await UserModel.findOne({ email: customerEmail });
      if (!user) {
        console.log("User not found");
      } else {
        let totalToken = user.credits || 0;
        totalToken += upgradeToken;
        user.credits = totalToken;
        await user.save();
        console.log("User updated" + user.credits);
      }
    }

    // Return a 200 response to acknowledge receipt of the event
    response.sendStatus(200);
  }
);
