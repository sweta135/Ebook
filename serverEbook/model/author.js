const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
  fullname: { type: String, required: true },
});

module.exports = mongoose.model("Author", authorSchema);
