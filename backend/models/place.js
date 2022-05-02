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
    placePhone: {
      type: String,
      required: true
    },
    placeRating: {
      type: String,
      required: true
    },
    placeWebsite: {
      type: String,
      required: true
    },
    placeImg: {
      type: String
    },
    placeDescription: {
      type: String
    },
    folderId: {
      type: Number
    }
    // token: {
    //   type: String,
    //   required: true
    // },
  }) 
);

module.exports = Place;