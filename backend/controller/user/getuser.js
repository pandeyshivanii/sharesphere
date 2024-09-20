const User = require("../../database/model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getallUser = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }
  const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

  const loggedInUserId = verifiedUser.id;

  try {
    const users = await User.find(
      { _id: { $ne: loggedInUserId } },
      { password: 0, email: 0 }
    );
    res.status(201).json(users);
  } catch (err) {
    res.status(404).json({ message: "Not found" });
  }
};
module.exports = getallUser;
