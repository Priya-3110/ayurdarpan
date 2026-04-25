const mongoose = require("mongoose");

const remedySchema = new mongoose.Schema({
  title: { type: String, required: true },
  forCondition: { type: String, required: true },
  ingredients: { type: [String], required: true },
  benefits: { type: [String], required: true },
  preparation: { type: [String], required: true },
  usage: { type: String, required: true },
  frequency: { type: String }, // optional
  precautions: { type: String },
  
  // 🆕 Video section
  video: {
    title: { type: String },        // YouTube video title
    link: { type: String, required: true }, // YouTube URL
    thumbnail: { type: String }     // optional thumbnail URL
  }
});

module.exports = mongoose.model("Remedy", remedySchema);
