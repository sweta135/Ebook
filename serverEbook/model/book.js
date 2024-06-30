const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  pages: { type: Number, required: true },
  category: { type: mongoose.Types.ObjectId, ref: "Genre", required: true },
  author: { type: mongoose.Types.ObjectId, ref: "Author", required: true },
  quantity: { type: Number, default: 0 },
  image: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Book", bookSchema);
