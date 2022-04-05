const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    emailConfirm: {
      type: Number, 
      enum: [-1, 1],
      default: -1
    },
    userId: {},
    confirmToken: {}
  })
);

module.exports = User;
