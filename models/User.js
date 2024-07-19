const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      requireed: true,
      unique: true,
    },
    password: {
      type: String,
      requireed: true,
    },
    jionedOn: {
      type: Date,
      default: Date.now(),
    },
    token: {
      type: String,
    },
    forgotPassword: {
      time: Date,
      otp: String,
    },
  },{
    collection: "User",
  });

module.exports = mongoose.model("User", userSchema );
