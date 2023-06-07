const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  delUser,
} = require("../Controllers/UserController");
// const UserController = require("../Controllers/UserController");
//////////////////////////////////
//////////////////////////////////
const { createPost } = require("../Controllers/PostController");
///------upload file start------//
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    var datetime = Date.now();
    cb(null, datetime + "-" + file.originalname);
  },
});
var upload = multer({ storage: storage });
//-------- upload file end -------//

// file upload
router.post("/post-upload", upload.single("image"), createPost);

//////////////////////////////////
//////////////////////////////////
router.post("/create-user", createUser);
router.post("/update-user", updateUser);
router.get("/get-user/:id", getUser);
router.get("/get-all", getAllUsers);
router.get("/del-user/:id", delUser);
module.exports = router;
