const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    // console.log(token);
    if (token) {
      tokenVerify = token.split(" ")[1];
      let user = jwt.verify(tokenVerify, secretKey);
      req.userId = user.id;
    } else {
      return res.status(401).json({ message: "Unauthorized User by token" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;
