const User = require("../Models/User");

const updateProfile = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, {
    profile: "upload/" + req.file.filename,
  });
  res.json({
    success: "update profile",
  });
};

module.exports = updateProfile;
