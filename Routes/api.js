const express = require("express");
const router = express.Router();
const { createCategory } = require("../Controllers/CategoryController");
const {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  delUser,
} = require("../Controllers/UserController");
const {
  createPost,
  getPosts,
  getPostsById,
  getPostsByUserId,
  updatePost,
} = require("../Controllers/PostController");
const authToken = require("../middleware/Auth");
const login = require("../Controllers/AuthController");
const updateProfile = require("../Controllers/PorfileController");
const {
  publish,
  unPublish,
  approvedByAdmnin,
} = require("../Controllers/PublishController");
const {
  forgotPassword,
  sendResetLink,
  resetLink,
} = require("../Controllers/forgotPasswordController");
const multer = require("multer");

///------upload file start------//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    var datetime = Date.now();
    cb(null, datetime + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
//-------- upload file end -------//

////post routs
router.post("/post-upload", upload.single("image"), createPost); // post upload
router.get("/post-all", getPosts);
router.get("/post-id/:id", getPostsById);
router.post("/user/posts", getPostsByUserId);
router.post("/post/update/:id", updatePost);

////user routes
router.post("/create-user", createUser);
router.post("/update-user", updateUser);
router.get("/get-user/:id", getUser);
router.get("/get-all", getAllUsers);
router.get("/del-user/:id", delUser);

////auth routes
router.post("/user/login", login);

////category routes
router.post("/store/category", createCategory);

////update user profile
router.post(
  "/update/user/profile/:id",
  upload.single("profile"),
  updateProfile
);

////publish post
router.get("/publish/post/:id", publish);
router.get("/unpublish/post/:id", unPublish);
router.get("/post/approved/:id", approvedByAdmnin);

////forgot password
// router.post("/reset/Link", resetLink);
// router.post("/forgot/Pass", authToken, forgotPassword);
router.post("/reset/Link", resetLink);
router.post("/forgot/Password", forgotPassword);

////
//////
/////
module.exports = router;
