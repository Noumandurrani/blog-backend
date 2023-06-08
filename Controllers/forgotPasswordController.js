const User = require("../Models/User");
const bcrypt = require("bcrypt");
// reset Link
const resetLink = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user != null) {
    res.json({
      message: "forgot password email sent",
    });
  } else {
    res.json({
      message: "invalid email",
    });
  }
};

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user != null) {
    const newPass = req.body.newPass;
    const confirmPass = req.body.confirmPass;
    if (newPass == confirmPass) {
      let salt = await bcrypt.genSalt();
      let encrypt_password = await bcrypt.hash(req.body.newPass, salt);
      await User.findOneAndUpdate(user.email, {
        password: encrypt_password,
      });
      res.json({
        message: "password updated",
      });
    } else {
      res.json({
        message: "password not matched",
      });
    }
  } else {
    res.json({
      message: "invalid email",
    });
  }
};

module.exports = {
  resetLink,
  forgotPassword,
};
