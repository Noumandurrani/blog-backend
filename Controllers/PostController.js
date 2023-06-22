const Post = require("../Models/Post");
const User = require("../Models/User");
///post create
const createPost = async (req, res) => {
  console.log(req.file);
  await Post.create({
    title: req.body.title,
    image: "upload/" + req.file.filename,
    body: req.body.body,
    author: req.body.author,
    category: req.body.category,
    user_id: req.body.user_id,
  });
  res.json({
    message: "post created",
  });
};
///get posts data
const getPosts = async (req, res) => {
  const getPostAll = await Post.find({});
  res.json({
    data: getPostAll,
  });
};
////////////////
///get posts data by id
const getPostsById = async (req, res) => {
  const getPost = await Post.findById(req.params.id);
  res.json({
    data: getPost,
  });
};
////////////////get post by user id
const getPostsByUserId = async (req, res) => {
  const getUserPost = await Post.find({ user_id: req.body.user_id });
  res.json({
    data: getUserPost,
  });
};
////////////////

module.exports = {
  createPost,
  getPosts,
  getPostsById,
  getPostsByUserId,
};
