require("dotenv").config();
let jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      console.log(err);
      res.status(401).send({ success: false, message: "Unauthorized" });
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = authentication;
