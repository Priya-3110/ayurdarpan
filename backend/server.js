const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ import cors
const connectDB = require("./db");
const recipesRouter = require("./routes/recipeRoutes");
const remediesRouter = require("./routes/remedyRoutes");
const yogaRouter = require("./routes/yoga");
const medicineRouter = require("./routes/medicineRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(bodyParser.json());
app.use(cors()); // ✅ allow all origins

// Routes
app.use("/api/recipes", recipesRouter);
app.use("/api/remedies", remediesRouter);
app.use("/api/yoga", yogaRouter);
app.use("/api/medicines", medicineRouter);



app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});