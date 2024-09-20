const User = require("../../database/model/user");

require("dotenv").config();

const getSingleUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.find({ _id: userId })
      .populate("post")
      .populate("followings.user")
      .populate("followers.user");

    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({ error });
  }
};
module.exports = getSingleUser;
