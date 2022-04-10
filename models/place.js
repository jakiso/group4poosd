const mongoose = require("mongoose");

// this can later have diffferent fields or we dont need to use it.
const Place = mongoose.model(
  "Place",
  new mongoose.Schema({
    placeName: {
      type: String,
      required: true
    },
    placeAddress: {
        type: String,
        required: true
    },
    // token: {
    //   type: String,
    //   required: true
    // },
  }) 
);

module.exports = Place;