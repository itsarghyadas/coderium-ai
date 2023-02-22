import mongoose from "mongoose";

// email validation
const emailValidation = {
  validator: function (v) {
    const emailRegex = /\S+@gmail\.com/;
    if (!emailRegex.test(v)) {
      throw new Error("Invalid email address");
    }
    return true;
  },
  reason: "Email address is not valid",
};
// user schema
const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: emailValidation,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

export default model;
