const User = require("../../database/model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const addFollow = async (req, res) => {
  try {
    const token = req.cookies.token;

    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const userId = verifiedUser.id;

    const user = await User.findById(userId);

    const userToFollow = req.body.usertofollow;

    if (!userToFollow) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user2 = await User.findById(userToFollow);

    if (!user2) {
      return res.status(400).json({ message: "User not found" });
    }

    const isFollowing = user.followings.some(
      (follow) => follow.user.toString() === user2._id.toString()
    );
    if (!isFollowing) {
      user.followings.push({ user: user2 });
      user2.followers.push({ user: user });
      await user.save();
      await user2.save();
      res.status(201).json({ message: `You followed ${user2.username}` });
    } else {
      res.status(208).json({ message: "You already followed" });
    }
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};
module.exports = addFollow;
