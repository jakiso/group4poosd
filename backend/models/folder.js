const mongoose = require("mongoose");

const Folder = mongoose.model(
  "Folder",
  new mongoose.Schema({
    // might not need userId here but I believe we might.
    userId: {
      type: Number,
      required: true
    },
    folderId: {
      type: Number,
      required: true
    },
    folderName: {
      type: String,
      required: true
    },
    placeList: [{   // placeList will store the names and addresses of locations.
      placeName: String,
      PlaceAddress: String
  }],
    // token: {
    //   type: String,
    //   required: true
    // },
  }) 
);

module.exports = Folder;
// This isn't implemented yet and we don't necessarily need to. Just in case we want to later.