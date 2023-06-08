const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
///post create
const createUser = async (req, res) => {
  /////encrypt paswrd
  let salt = await bcrypt.genSalt();
  let encryptPassword = await bcrypt.hash(req.body.password, salt);
  /////
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: encryptPassword,
    profile: process.env.AVATAR_IMAGE,
    role: "admin",
  });
  let token = await createWebTtoken(user._id);
  res.json({
    message: "create user",
    data: user,
    token: token,
  });
};

////update user
const updateUser = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.body._id },
    {
      firstName: req.body.firstName,
      password: req.body.password,
      profile: req.body.profile,
    }
  );
  res.json({
    message: "user data updated",
  });
};

////get user by id
const getUser = async (req, res) => {
  const getUserbyid = await User.findById(req.params.id);
  res.json({
    userData: getUserbyid,
  });
};

////get user by id
const getAllUsers = async (req, res) => {
  const getUsers = await User.find({});
  res.json({
    userData: getUsers,
  });
};

////del user by id
const delUser = async (req, res) => {
  const delUserbyid = await User.findByIdAndDelete(req.params.id);
  res.json({
    message: "deleted successfully",
  });
};

////// authentication(jwt token)
const createWebTtoken = async (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
//////

////export user
module.exports = {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  delUser,
};
