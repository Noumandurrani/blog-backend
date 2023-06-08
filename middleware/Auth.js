///
// SOLID
// 1- index
// 2- Store
// 3- edit
// 4- update
// 5- destroy
// 6- create
///
const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  if (req.headers.token) {
    let userToken = req.headers.token;
    jwt.verify(userToken, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).json({
          error: "invalid token",
        });
      } else {
        req._id = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).json({
      error: "invalid token",
    });
  }
};

module.exports = authToken;
