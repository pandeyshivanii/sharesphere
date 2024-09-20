const User = require("../../database/model/user");
const Post = require("../../database/model/post");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getAllpost = async (req, res) => {
  try {
    const token = req.cookies.token;

    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const userId = verifiedUser.id;

    const user = await User.findById(userId).populate(
      "followings.user",
      "post"
    );

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Extract post IDs from the followed users
    const followedPosts = user.followings
      .map((followedUser) => followedUser.user.post)
      .flat();
    const userpost = user.post;
    // console.log(userpost);
    followedPosts.push(...user.post);

    // Fetch the actual posts from the Post model
    const posts = await Post.find({ _id: { $in: followedPosts } })

      .populate({
        path: "createdBy",
        select: {
          post: 0,
          email: 0,
          password: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      })
      .populate({
        path: "likes.user",
        select: {
          post: 0,
          email: 0,
          password: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      })
      .populate({
        path: "comments.user",
        select: {
          post: 0,
          email: 0,
          password: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      })
      .populate({
        path: "comments.reply.user",
        select: {
          post: 0,
          email: 0,
          password: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      })

      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = getAllpost;
