const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  albumId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
  },
  file: {
    filename: String,
    size: Number,
    mimeType: String,
    cloudUrl: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive", "deleted"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Image", imageSchema);
