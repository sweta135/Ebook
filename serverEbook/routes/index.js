var express = require("express");
var router = express.Router();

const bookController = require("../controller/bookController");
const { isAuthenticated, isAdmin } = require("../middleware/userAuth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Swera Books" });
});
router.get("/book/:id", bookController.getBook);
router.delete("/book/:id", isAuthenticated, isAdmin, bookController.deleteBook);
router.patch("/book/:id", isAuthenticated, isAdmin, bookController.updateBook);
router.get("/categories", bookController.getCategories);
router.get("/categories/:id", bookController.getBookByCategory);
router.post("/book", isAuthenticated, isAdmin, bookController.addBook);
router.get("/book", bookController.getBooks);

router.post("/cart", isAuthenticated, bookController.addToCart);
router.get("/cart", isAuthenticated, bookController.getCart);
router.delete("/cart/:id", isAuthenticated, bookController.deleteCartItem);

module.exports = router;
