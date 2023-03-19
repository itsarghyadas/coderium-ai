import mongoose from "mongoose";

const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log();
    console.log("🚀 Connected to MongoDB Successfully!");
  } catch (error) {
    console.error("Failed to connect with MongoDB. Check your connection!");
    console.error(error);
    process.exit(1);
  }
};

mongoose.set("strictQuery", true);

export default connectDB;
