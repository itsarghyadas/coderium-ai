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

// user schema and model definition
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
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
    required: true,
    minlength: 8,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  credits: {
    type: Number,
    default: 10000,
    min: 0,
  },
});

const UserModel = mongoose.model("User", UserSchema, "user-data");

export default UserModel;
