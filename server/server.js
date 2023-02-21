import express from "express";
const app = express();
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.model.js";
mongoose.set("strictQuery", false);
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));

// This is the route that will be used to register the user
app.post("/api/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      console.log("Email address already in use.");
      return res.status(401).json({
        success: false,
        message: "Email address already in use.",
        emailExists: true,
      });
    }
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      console.log("Username already exists.");
      return res.status(403).json({
        success: false,
        message: "Username already exists.",
        usernameExists: true,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    console.log("Hey! Welcome, New User created");
    return res.json({
      success: true,
      emailExists: false,
      usernameExists: false,
      user: token,
    });
  } catch (error) {
    if (error.errors?.email?.kind === "user defined") {
      console.error("Registration failed: Invalid Gmail address.");
      return res
        .status(400)
        .json({ success: false, message: "Invalid Gmail address." });
    }

    console.error("Registration failed: unknown reason.");
    return res.status(500).json({
      success: false,
      message: "Unknown reason, please try again later.",
    });
  }
});

// This is the route that will be used to login the user
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Please check your email or password",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        error: "Please check your email or password",
      });
    }
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET
    );
    res.json({ success: true, user: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// This is the route to check if the server is working
app.get("/", (req, res) => {
  res.send("<h1>Hello, The server is Working.</h1>");
});

// This is the route to listen to the server
app.listen(1337, () => {
  console.log("🚀 @ http://localhost:1337");
});
