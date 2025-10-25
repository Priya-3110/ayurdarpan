// models/Yoga.js
const mongoose = require("mongoose");

const yogaSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // numeric ID
  title: { type: String, required: true },
  sanskrit: { type: String },
  category: { type: String },
  description: { type: String },
  image: { type: String },
  video: { type: String },
  level: { type: String, enum: ["beginner", "intermediate", "advanced"], default: "beginner" },
  duration: { type: String }, // e.g., "2 min", "3 min"
  benefits: [String],
  instructions: [String],
  precautions: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Yoga", yogaSchema);
