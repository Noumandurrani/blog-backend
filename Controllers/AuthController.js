const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

////// authentication(jwt token)
const createWebTtoken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//////

const login = async (req, res) => {
  // find user by email
  let user = await User.findOne({ email: req.body.email });
  if (user != null) {
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (isValid) {
      let jwtToken = await createWebTtoken(user._id);
      res.status(200).json({
        success: true,
        token: jwtToken,
        data: user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "invalid password",
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: "invalid email",
    });
  }
};
module.exports = login;
