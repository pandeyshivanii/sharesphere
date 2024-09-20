const Post = require("../../database/model/post");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const deleteComment = async (req, res) => {
  const token = req.cookies.token;
  const blogId = req.params.id;
  const commentId = req.params.commentId;
  if (!token) {
    return res.json({ status: false });
  }
  const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

  const userId = verifiedUser.id;
  const post = await Post.findById(blogId);

  const comment = post.comments.find(
    (comment) => comment._id.toString() === commentId
  );

  if (comment.user.toString() !== userId.toString()) {
    return res.status(403).json({ message: "Permission denied" });
  }
  post.comments = post.comments.filter(
    (comment) => comment._id.toString() !== commentId
  );
  await post.save();
  res.json({ message: "Comment deleted successfully" });
};
module.exports = deleteComment;
