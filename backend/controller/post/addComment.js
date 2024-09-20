const Post = require("../../database/model/post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const addComment = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false });
    }
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const userId = verifiedUser.id;
    const post = await Post.findById(req.params.id);
    const newComment = {
      user: userId,
      comment: req.body.comment,
    };

    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
module.exports = addComment;
