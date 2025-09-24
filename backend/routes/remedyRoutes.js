// const express = require("express");
// const axios = require("axios");

// const router = express.Router();

// // Replace this with your free API endpoint (MockAPI or similar)
// const API_URL = "https://68d26b9fcc7017eec543cb5f.mockapi.io/remedies";

// // GET all remedies or search by name
// router.get("/", async (req, res) => {
//   try {
//     const response = await axios.get(API_URL);
//     let remedies = response.data;

//     if (req.query.name) {
//       remedies = remedies.filter((r) =>
//         r.name.toLowerCase().includes(req.query.name.toLowerCase())
//       );
//     }

//     res.json(remedies);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST a new remedy
// router.post("/", async (req, res) => {
//   try {
//     const newRemedy = {
//       name: req.body.name,
//       description: req.body.description,
//       created_at: new Date(),
//     };

//     const response = await axios.post(API_URL, newRemedy);
//     res.json(response.data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // DELETE a remedy by ID
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
const router = express.Router();
const Remedy = require("../models/Remedy");

// ✅ GET all remedies or search by name
router.get("/", async (req, res) => {
  try {
    const query = {};
    if (req.query.name) {
      // case-insensitive search
      query.name = { $regex: req.query.name, $options: "i" };
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
      name: req.body.name,
      description: req.body.description,
    });

    const savedRemedy = await newRemedy.save();
    res.json(savedRemedy);
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
