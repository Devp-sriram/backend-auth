import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    jionedOn: {
      type: Date,
      default: Date.now(),
    },
    token: {
      type: String,
    },
    forgotPassword: {
      type: Date,
      Otp : String
    },
  },{
    collection: "User",
  });

export default mongoose.model("User", userSchema );
