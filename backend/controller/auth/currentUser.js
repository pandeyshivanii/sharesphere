const jwt = require("jsonwebtoken");
require("dotenv").config();

const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const userId = verifiedUser.id;

    res.status(201).json(userId);
  } catch (err) {
    res.status(404).json({ message: "User not found" });
  }
};
module.exports = getCurrentUser;
