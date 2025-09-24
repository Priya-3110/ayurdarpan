const mongoose = require("mongoose");

const remedySchema = new mongoose.Schema({
  id: Number,
  title: String,
  for: String,
  ingredients: [String],
  benefits: [String],
  preparation: [String],
  usage: String,
  frequency: String,
  precautions: String
});

module.exports = mongoose.model("Remedy", remedySchema);
