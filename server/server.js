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

//! This is the route that will be used to register the user
app.post("/api/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      res.json({
        status: "error",
        error: "Duplicate Email",
        emailExists: true,
      });
      console.log("Duplicate Email");
    } else {
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
      res.json({ status: "ok", emailExists: false, user: token });
      console.log("Hey! Welcome, New User created");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unknown Error" });
    console.log("Registration Failed");
  }
});

//! This is the route that will be used to login the user
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET
    );
    res.json({ status: "ok", user: token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Unknown Error" });
  }
});

app.listen(1337, () => {
  console.log("Server listening on port 1337");
});
