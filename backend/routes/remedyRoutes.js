const express = require("express");
const Remedy = require("../models/Remedy");
const router = express.Router();

// ✅ GET all remedies or search by title
router.get("/", async (req, res) => {
  try {
    const { title } = req.query;
    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" }; // case-insensitive search
    }

    const remedies = await Remedy.find(query);
    res.json(remedies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST a new remedy
router.post("/", async (req, res) => {
  try {
    const newRemedy = new Remedy({
      id: req.body.id,
      title: req.body.title,
      for: req.body.for,
      ingredients: req.body.ingredients || [],
      benefits: req.body.benefits || [],
      preparation: req.body.preparation || [],
      usage: req.body.usage,
      frequency: req.body.frequency,
      precautions: req.body.precautions,
      video: req.body.video || "", // optional video link
    });

    const savedRemedy = await newRemedy.save();
    res.json(savedRemedy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT (update) a remedy by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedRemedy = await Remedy.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        for: req.body.for,
        ingredients: req.body.ingredients,
        benefits: req.body.benefits,
        preparation: req.body.preparation,
        usage: req.body.usage,
        frequency: req.body.frequency,
        precautions: req.body.precautions,
        video: req.body.video,
      },
      { new: true }
    );

    if (!updatedRemedy) {
      return res.status(404).json({ error: "Remedy not found" });
    }

    res.json(updatedRemedy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE a remedy by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedRemedy = await Remedy.findByIdAndDelete(req.params.id);
    if (!deletedRemedy) {
      return res.status(404).json({ error: "Remedy not found" });
    }
    res.json(deletedRemedy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
