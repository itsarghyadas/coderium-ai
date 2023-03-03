// import the modules
import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";

// import the database connection
import connectDB from "./mongodb/connect.js";
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
app.use("/api", router); // This is the route to use the router
