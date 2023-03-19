import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./mongodb/connect.js";
import router from "./router/route.js";

dotenv.config();

const app = express();
app.use(cors());
app.use((req, res, next) => {
  if (req.originalUrl === "/api/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.disable("x-powered-by");

const { MONGODB_URL, PORT } = process.env;

const startServer = async () => {
  try {
    await connectDB(MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`🚀 Listening on http://localhost:${PORT}`);
      console.log();
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});

app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(error.status || 500).json({
    message: error.message || "Internal Server Error",
  });
});

app.get("/", (req, res) => {
  res.send("Hello, The server is Working Fine 🚀");
});

app.use("/api", router);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
