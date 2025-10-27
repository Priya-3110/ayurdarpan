const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  dosha: { type: String, enum: ["Vata", "Pitta", "Kapha"] },
  ingredients: [String],
  procedure: [String],
  benefits: [String],
  nutrients: {
    Calories: String,
    Protein: String,
    Fat: String,
    Carbs: String
  },
  video: String // ✅ Added field for YouTube or embed link
});

module.exports = mongoose.model("Recipe", recipeSchema);
