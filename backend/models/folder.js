const mongoose = require("mongoose");

const Folder = mongoose.model(
  "Folder",
  new mongoose.Schema({
    // might not need userId here but I believe we might.
    userId: {type: Number, required: true},
    folderName: {type: String, required: true},
    folderType: {type: String, required: true},
    placeList: [
        {placeName: String,
        placeAddress: String,
        placeRating: String,
        placeWebsite: String,
        placeImg: String,
        folderId: Number,
        placeDescription: String,
        placePhone: String
      }
    ]
  }) 
);

module.exports = Folder;
// This isn't implemented yet and we don't necessarily need to. Just in case we want to later.