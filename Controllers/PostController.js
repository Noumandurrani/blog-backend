const Post = require("../Models/Post");

///post create
const createPost = async (req, res) => {
  console.log(req.file);
  await Post.create({
    title: req.body.title,
    image: "upload/" + req.file.filename,
    body: req.body.body,
    author: req.body.author,
    category: req.body.category,
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
////////////////

module.exports = {
  createPost,
  getPosts,
  getPostsById,
};
