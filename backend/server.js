require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Groq = require("groq-sdk");

// Existing imports
const connectDB = require("./db");
const recipesRouter = require("./routes/recipeRoutes");
const remediesRouter = require("./routes/remedyRoutes");
const yogaRouter = require("./routes/yoga");
const medicineRouter = require("./routes/medicineRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect DB
connectDB();

// ✅ Middleware
app.use(bodyParser.json());
app.use(cors());

// ✅ Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ================= ROUTES =================

// Existing routes
app.use("/api/recipes", recipesRouter);
app.use("/api/remedies", remediesRouter);
app.use("/api/yoga", yogaRouter);
app.use("/api/medicines", medicineRouter);

// ================= CHATBOT ROUTE =================

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const messages = [
      {
        role: "system",
        content: `
You are an expert Ayurveda AI assistant for a health app.

Instructions:
- Give safe home remedies only
- Keep answers simple and practical
- Do NOT give harmful or risky advice
- If condition is serious, suggest consulting a doctor

Format strictly:
1. Cause
2. Home Remedies
3. Diet Tips
4. Precautions
        `,
      },
      ...(history || []),
      {
        role: "user",
        content: message,
      },
    ];

    const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile", // ✅ NEW WORKING MODEL
  messages,
});

    res.json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("Chatbot Error:", error);
    res.status(500).json({
      error: "Chatbot failed",
      details: error.message,
    });
  }
});

// ================= TEST ROUTE =================

app.get("/", (req, res) => {
  res.send("✅ API Running with Chatbot");
});

// ================= START SERVER =================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});