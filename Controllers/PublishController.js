const Post = require("../Models/Post");

const publish = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    is_pubish: true,
  });
  res.json({
    success: true,
    message: "post publish successfully!",
  });
};

const unPublish = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    is_pubish: false,
  });
  res.json({
    success: true,
    message: "post unpublish successfully!",
  });
};

////admin approval
const approvedByAdmnin = async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, {
    is_approvedByAdmin: true,
  });
  res.json({
    success: true,
    message: "post approved successfully!",
  });
};

module.exports = {
  publish,
  unPublish,
  approvedByAdmnin,
};
