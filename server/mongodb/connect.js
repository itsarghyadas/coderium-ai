import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("🚀 Connected to MongoDB Successfully!");
  } catch (err) {
    console.error("Failed to connect with MongoDB. Check your connection!");
    console.error(err);
  }
};

mongoose.set("strictQuery", true);

export default connectDB;
