// routes/yoga.js
const express = require("express");
const router = express.Router();
const Yoga = require("../models/Yoga");

// GET all yoga items (optional search by title or type)
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
      title: req.body.title,
      image: req.body.image,
      level: req.body.level,
      durationMinutes: req.body.durationMinutes,
      benefits: req.body.benefits || [],
      steps: req.body.steps || [],
      type: req.body.type
    });
    const saved = await yoga.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE by id
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
