const Post = require("../../database/model/post");

const getComments = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId).populate({
      path: "comments.user",
      select: {
        post: 0,
        email: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    });

    res.status(201).json(post.comments);
  } catch (err) {
    res.status(501).json({ message: "Internal Server Error" });
  }
};
module.exports = getComments;
