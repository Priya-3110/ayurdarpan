const express = require("express");
const router = express.Router();
const Yoga = require("../models/Yoga");

// GET all yoga items (optional search by title, type, or level)
router.get("/", async (req, res) => {
  try {
    const { title, type, level } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: "i" };
    if (type) query.type = { $regex: type, $options: "i" };
    if (level) query.level = level;
    const items = await Yoga.find(query).sort({ created_at: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - create new yoga item
router.post("/", async (req, res) => {
  try {
    const yoga = new Yoga({
      id: req.body.id,
      title: req.body.title,
      sanskrit: req.body.sanskrit,
      category: req.body.category,
      description: req.body.description,
      image: req.body.image,
      video: req.body.video,
      level: req.body.level,
      duration: req.body.duration,
      benefits: req.body.benefits || [],
      instructions: req.body.instructions || [],
      precautions: req.body.precautions
    });
    const saved = await yoga.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - update yoga item by MongoDB _id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Yoga.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        title: req.body.title,
        sanskrit: req.body.sanskrit,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image,
        video: req.body.video,
        level: req.body.level,
        duration: req.body.duration,
        benefits: req.body.benefits || [],
        instructions: req.body.instructions || [],
        precautions: req.body.precautions
      },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Yoga item not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE by _id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Yoga.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Yoga item not found" });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
