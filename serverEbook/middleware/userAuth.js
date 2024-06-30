const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (typeof bearerToken !== "undefined") {
    const token = bearerToken.split(" ")[1];
    jwt.verify(
      token,
      "ajksdhfbkajscdhvbnoweliufbhlcsxjmnv",
      (err, authData) => {
        if (err) {
          res.json({
            success: false,
            message: "access denied",
          });
        } else {
          req.headers.authData = authData;
          next();
        }
      }
    );
  } else {
    console.log("smthng went wrong validating token");
    res.sendStatus(403).json({
      message: "something went wrong",
    });
  }
};

module.exports.isAdmin = (req, res, next) => {
  const authData = req.headers.authData;
  if (authData.isAdmin) {
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "access denied",
    });
  }
};
