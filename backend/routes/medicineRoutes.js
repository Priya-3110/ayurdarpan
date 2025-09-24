const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const fs = require("fs");
const path = require("path");

module.exports = (upload, mongoUri) => {
  const router = express.Router();

  // Add medicine
  router.post("/", upload.single("file"), async (req, res) => {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db("ayurveda");
    const collec = db.collection("medicines");

    const obj = {
      name: req.body.name,
      description: req.body.description,
      file_name: req.file.filename,
      file_url: `http://localhost:${process.env.PORT || 5000}/uploads/${req.file.filename}`,
      created_at: new Date(),
    };

    collec
      .insertOne(obj)
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json({ error: err.message }))
      .finally(() => client.close());
  });

  // Get medicines
  router.get("/", async (req, res) => {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db("ayurveda");
    const collec = db.collection("medicines");

    const query = req.query.name ? { name: req.query.name } : {};
    collec
      .find(query)
      .toArray()
      .then((result) => res.json(result))
      .catch((err) => res.status(500).json({ error: err.message }))
      .finally(() => client.close());
  });

  // Delete medicine
  router.delete("/:id", async (req, res) => {
    const client = new MongoClient(mongoUri);
    await client.connect();
    const db = client.db("ayurveda");
    const collec = db.collection("medicines");
    const _id = new ObjectId(req.params.id);

    const doc = await collec.findOne({ _id });
    if (doc) {
      fs.promises.unlink(path.join(__dirname, "..", "uploads", doc.file_name)).catch((err) => console.log(err));
      collec
        .deleteOne({ _id })
        .then((result) => res.json(result))
        .catch((err) => res.status(500).json({ error: err.message }))
        .finally(() => client.close());
    } else {
      res.status(404).json({ error: "Medicine not found" });
      client.close();
    }
  });

  return router;
};
