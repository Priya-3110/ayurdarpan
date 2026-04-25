// const mongoose = require("mongoose");

// const medicineSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   benefits: String
// });

// module.exports = mongoose.model("Medicine", medicineSchema);
const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  benefits: { type: String, required: false },
  image: { type: String, required: false } // ✅ added image field
});

module.exports = mongoose.model("Medicine", medicineSchema);
