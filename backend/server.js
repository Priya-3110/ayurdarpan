// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Routes
// const remedyRoutes = require("./routes/remedyRoutes");
// const recipeRoutes = require("./routes/recipeRoutes");
// const medicineRoutes = require("./routes/medicineRoutes");

// app.use("/api/remedies", remedyRoutes);
// app.use("/api/recipes", recipeRoutes);
// app.use("/api/medicines", medicineRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // ✅ import cors
const connectDB = require("./db");
const recipesRouter = require("./routes/recipeRoutes");
const remediesRouter = require("./routes/remedyRoutes");
const yogaRouter = require("./routes/yoga");

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

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
