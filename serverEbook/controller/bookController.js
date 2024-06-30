const Categories = require("../model/genre");

const Book = require("../model/book");

const Author = require("../model/author");

const Cart = require("../model/cart");
const cart = require("../model/cart");

module.exports.getCategories = async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.json({
      success: true,
      categories,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};

module.exports.addBook = async (req, res) => {
  try {
    console.log(req.body);
    const {
      title,
      price,
      pages,
      category,
      author,
      quantity,
      image,
      description,
    } = req.body;

    const authorFind = await Author.findOne({ fullname: author });

    let authorr = null;

    if (authorFind) {
      authorr = authorFind;
    } else {
      const newAuthor = new Author({
        fullname: author,
      });
      console.log(newAuthor, "author to save");
      await newAuthor.save();
      authorr = newAuthor;
    }
    const book = new Book({
      title,
      price,
      pages,
      category,
      author: authorr._id,
      quantity,
      image,
      description,
    });

    await book.save();

    res.json({
      success: true,
      message: "book added",
      book,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "add book failed",
    });
  }
};

module.exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    await Promise.all(books.map((book) => book.populate("author")));
    await Promise.all(books.map((book) => book.populate("category")));

    res.json({
      success: true,
      message: "book fetched",
      books,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "get book failed",
    });
  }
};
module.exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    await book.populate("author");
    await book.populate("category");

    if (!book) {
      return res.json({
        success: false,
        message: "book not found",
      });
    }

    res.json({
      success: true,
      message: "book fetched",
      book,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "get book failed",
    });
  }
};

module.exports.addToCart = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.headers.authData.id;

    const cartItem = new Cart({
      bookName: req.body.book.title,
      price: parseInt(req.body.cartCount) * parseInt(req.body.book.price),
      quantity: req.body.cartCount,
      on: userId,
    });
    await cartItem.save();

    const cartItemsForUser = await Cart.find({ on: userId });

    res.json({
      success: true,
      cart: cartItemsForUser,
      message: "added item to cart",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "cart failed",
    });
  }
};

module.exports.getCart = async (req, res) => {
  try {
    const userId = req.headers.authData.id;

    const cartItemsForUser = await Cart.find({ on: userId });

    res.json({
      success: true,
      cart: cartItemsForUser,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "cart failed",
    });
  }
};

module.exports.deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findByIdAndDelete(id);

    const userId = req.headers.authData.id;

    const cartItemsForUser = await Cart.find({ on: userId });

    res.json({
      success: true,
      cart: cartItemsForUser,
      message: "deleted cart",
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "cart failed",
    });
  }
};

module.exports.getBookByCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.find({ category: id });
    await Promise.all(books.map((book) => book.populate("author")));
    await Promise.all(books.map((book) => book.populate("category")));

    res.json({
      success: true,
      message: "book fetched",
      books,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "get by category failed",
    });
  }
};

module.exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    await Book.findByIdAndDelete(id);

    const books = await Book.find({});

    await Promise.all(books.map((book) => book.populate("author")));
    await Promise.all(books.map((book) => book.populate("category")));

    res.json({
      success: true,
      message: "book",
      books,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "book deletion failed",
    });
  }
};

module.exports.updateBook = async (req, res) => {
  try {
    const {
      title,
      price,
      pages,
      category,
      author,
      quantity,
      image,
      description,
    } = req.body;
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.json({
        success: false,
        message: "book not found",
      });
    }

    const authorFound = await Author.findOne({ fullname: author });

    if (authorFound) {
      book.author = authorFound._id;
    } else {
      const newAuthor = new Author({
        fullname: author,
      });
      await newAuthor.save();
      book.author = newAuthor._id;
    }
    book.title = title;
    book.price = price;
    book.pages = pages;
    book.category = category;
    book.quantity = quantity;
    book.image = image;
    book.description = description;

    await book.save();

    res.json({
      success: true,
      message: "book Edited",
      book,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "get book failed",
    });
  }
};
