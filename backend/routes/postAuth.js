const upload = require("../azuremulter/azuremulter.js");
const express = require("express");
const addPost = require("../controller/post/AddPost.js");
const getAllpost = require("../controller/post/getAllPost.js");
const getSinglePost = require("../controller/post/getSinglePost.js");
const addComment = require("../controller/post/addComment.js");
const addReply = require("../controller/post/addReply.js");
const likePost = require("../controller/post/addLike.js");
const deleteComment = require("../controller/post/deleteComment.js");
const unlikePost = require("../controller/post/unlikePost.js");
const getComments = require("../controller/post/getComments.js");
const deletePost = require("../controller/post/deletePost.js");
const router = express.Router();

router.post("/addpost", upload.single("postimage"), addPost);
router.get("/getallpost", getAllpost);
router.get("/getsinglepost/:id", getSinglePost);

router.post("/:id/addcomment", addComment);

router.post("/addreply/:id/:commentid", addReply);
router.post("/:id/addlike", likePost);

router.put("/:id/:commentId/deletecomment", deleteComment);
router.post("/:id/unlike", unlikePost);

router.get("/:id/getcomments", getComments);
router.delete("/:id/deletepost", deletePost);
module.exports = router;
