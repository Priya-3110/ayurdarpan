// models/Yoga.js
const mongoose = require("mongoose");

const yogaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String },
  level: { type: String, enum: ["Beginner","Intermediate","Advanced"], default: "Beginner" },
  durationMinutes: { type: Number }, // recommended duration
  benefits: [String],
  steps: [String],
  type: { type: String }, // e.g., "Asana", "Pranayama", "Meditation"
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Yoga", yogaSchema);
