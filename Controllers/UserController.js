const User = require("../Models/User");

///post create
const createUser = async (req, res) => {
  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    profile: process.env.AVATAR_IMAGE,
    role: "user",
  });
  res.json({
    message: "create user",
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

////export user
module.exports = {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  delUser,
};
