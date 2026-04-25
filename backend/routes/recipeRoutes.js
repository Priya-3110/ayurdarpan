const express = require("express");
const Recipe = require("../models/Recipe"); // Import mongoose model

const router = express.Router();

// ✅ GET all recipes or search by title
router.get("/", async (req, res) => {
  try {
    const { title } = req.query;
    let recipes;

    if (title) {
      // Case-insensitive search by title
      recipes = await Recipe.find({ title: new RegExp(title, "i") });
    } else {
      recipes = await Recipe.find();
    }

    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST a new recipe
router.post("/", async (req, res) => {
  try {
    const newRecipe = new Recipe({
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      dosha: req.body.dosha,
      ingredients: req.body.ingredients || [],
      procedure: req.body.procedure || [],
      benefits: req.body.benefits || [],
      nutrients: req.body.nutrients || {},
      video: req.body.video // ✅ Include video field
    });

    const savedRecipe = await newRecipe.save();
    res.json(savedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE a recipe by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!deletedRecipe)
      return res.status(404).json({ error: "Recipe not found" });
    res.json({ message: "Recipe deleted successfully", deletedRecipe });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
