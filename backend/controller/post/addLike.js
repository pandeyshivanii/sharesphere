const Post = require("../../database/model/post");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const likePost = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({ status: false });
    }
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const userId = verifiedUser.id;
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === userId).length > 0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: userId });

    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};
module.exports = likePost;
