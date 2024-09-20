const Post = require("../../database/model/post");

const jwt = require("jsonwebtoken");

require("dotenv").config();

const addReply = async (req, res) => {
  const token = req.cookies.token;
  const postId = req.params.id;
  const commentId = req.params.commentid;

  if (!token) {
    return res.status(404).json({ status: false });
  }
  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);
    const userId = verifiedUser.id;
    const post = await Post.findById(postId);
    const comment = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    if (comment.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Permission denied" });
    }
    const reply = {
      user: userId,
      replyText: req.body.replytext,
    };

    comment.reply.unshift(reply);
    await post.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = addReply;
