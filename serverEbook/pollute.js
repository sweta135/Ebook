const mongoose = require("mongoose");

const Genre = require("./model/genre");

mongoose
  .connect("mongodb://127.0.0.1:27017/Swera", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const genres = ["Horror", "Fantasy", "Adventure", "Mystery", "RomCom"];

function polluteGenre() {
  genres.forEach(async (value) => {
    const newGenre = new Genre({
      genreName: value,
    });
    await newGenre.save();
  });
}

polluteGenre();
