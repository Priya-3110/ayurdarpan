// const express = require("express");
// const axios = require("axios");

// const router = express.Router();

// // Replace this with your free API endpoint (MockAPI or similar)
// const API_URL = "https://68d26b9fcc7017eec543cb5f.mockapi.io/recipes";

// // ✅ GET all recipes or search by title
// router.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(API_URL);
//     let recipes = response.data;

//     if (req.query.title) {
//       recipes = recipes.filter((r) =>
//         r.title.toLowerCase().includes(req.query.title.toLowerCase())
//       );
//     }

//     res.json(recipes);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ POST a new recipe
// router.post("/", async (req, res) => {
//   try {
//     const newRecipe = {
//       title: req.body.title,
//       description: req.body.description,
//       dosha: req.body.dosha,
//       ingredients: req.body.ingredients || [],
//       procedure: req.body.procedure || [],
//       benefits: req.body.benefits || [],
//       nutrients: req.body.nutrients || {},
//       created_at: new Date(),
//     };

//     const response = await axios.post(API_URL, newRecipe);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ✅ DELETE a recipe by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${req.params.id}`);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const Recipe = require("../models/Recipe"); // import mongoose model

const router = express.Router();

// ✅ GET all recipes or search by title
router.get("/", async (req, res) => {
  try {
    const { title } = req.query;
    let recipes;

    if (title) {
      recipes = await Recipe.find({ title: new RegExp(title, "i") }); // case-insensitive search
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
      dosha: req.body.dosha,
      ingredients: req.body.ingredients || [],
      procedure: req.body.procedure || [],
      benefits: req.body.benefits || [],
      nutrients: req.body.nutrients || {},
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
    res.json(deletedRecipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
