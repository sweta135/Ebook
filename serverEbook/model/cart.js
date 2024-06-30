const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  bookName: { type: String },
  quantity: { type: Number },
  price: { type: Number },
  on: { type: mongoose.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Cart", cartSchema);
