var express = require("express");
var router = express.Router();
const userController = require("../controller/userController");
const auth = require("../middleware/userAuth");

router.post("/login", userController.login);

router.get(
  "/getUserByToken",
  auth.isAuthenticated,
  userController.getUserByToken
);

router.post("/", userController.register);

module.exports = router;
