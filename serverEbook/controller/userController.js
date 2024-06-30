const User = require("../model/user");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    console.log(req.body);

    const foundUsers = await User.find({});

    const emailRegistered = await User.find({ email: req.body.email });
    if (emailRegistered.length) {
      return res.json({
        success: false,
        message: "email already registered",
      });
    }

    const newUser = new User({
      fullname: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    if (!foundUsers.length) {
      newUser.isAdmin = true;
    }

    await newUser.save();

    console.log(foundUsers);
    res.send({
      success: true,
      message: "User registered Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "register error",
    });
  }
};

module.exports.login = async (req, res) => {
  try {
    console.log(req.body);
    const userFound = await User.findOne({
      email: req.body.email,
    });

    if (userFound.password === req.body.password) {
      const infoObject = {
        id: userFound._id,
        name: userFound.firstname,
        isAdmin: userFound.isAdmin,
      };
      const expiryInfo = {
        expiresIn: "1h",
      };

      const token = jwt.sign(
        infoObject,
        "ajksdhfbkajscdhvbnoweliufbhlcsxjmnv",
        expiryInfo
      );

      const userWithoutPassword = await User.findOne({
        email: req.body.email,
      }).select("-password");
      res.json({
        success: true,
        token,
        message: "logged in",
        user: userWithoutPassword,
      });
    } else {
      res.json({
        success: false,
        message: "incorrect password",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "login server error",
    });
  }
};

module.exports.getUserByToken = async (req, res) => {
  try {
    const authData = req.headers.authData;
    const loggedInUser = await User.findById(authData.id).select("-password");
    res.json({
      success: true,
      user: loggedInUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "server error",
    });
  }
};
