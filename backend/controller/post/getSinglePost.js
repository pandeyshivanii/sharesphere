const Post = require("../../database/model/post");

const getSinglePost = async (req, res) => {
  const post = await Post.find({ _id: req.params.id })
    .populate(["likes.user", "comments.user", "comments.reply.user"])
    .populate({
      path: "createdBy",
      select: {
        blog: 0,
        email: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0,
      },
    });
  res.status(200).json(post);
};
module.exports = getSinglePost;
