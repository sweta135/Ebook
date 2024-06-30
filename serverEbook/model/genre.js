const mongoose = require("mongoose");

const genreSchema = mongoose.Schema({
  genreName: { type: String, required: true },
});

module.exports = mongoose.model("Genre", genreSchema);
