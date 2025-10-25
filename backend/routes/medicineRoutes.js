const express = require("express");
const Medicine = require("../models/Medicine"); // import mongoose model
const router = express.Router();

// ✅ GET all medicines or search by name
router.get("/", async (req, res) => {
  try {
    const { name } = req.query;
    let medicines;

    if (name) {
      medicines = await Medicine.find({ name: new RegExp(name, "i") }); // case-insensitive search
    } else {
      medicines = await Medicine.find();
    }

    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST a new medicine
router.post("/", async (req, res) => {
  try {
    const newMedicine = new Medicine({
      name: req.body.name,
      price: req.body.price,
      benefits: req.body.benefits || [],
    });

    const savedMedicine = await newMedicine.save();
    res.json(savedMedicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE a medicine by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMedicine = await Medicine.findByIdAndDelete(req.params.id);
    res.json(deletedMedicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE a medicine by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, price, benefits, image } = req.body;

    // Update medicine document
    const updatedMedicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, price, benefits, image },
      { new: true } // return updated document
    );

    if (!updatedMedicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }

    res.json(updatedMedicine);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;