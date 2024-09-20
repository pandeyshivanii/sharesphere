const User = require("../../database/model/user");
const bcrypt = require("bcrypt");

const env = require("dotenv");
const { createSecretToken } = require("../../tokengeneration/tokengeneration");

env.config();

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!(email && password)) {
    return res.status(400).json({ message: "All input is required" });
  }
  const user = await User.findOne({ email });
  if (!(user && (await bcrypt.compare(password, user.password)))) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  const token = createSecretToken(user._id);

  res.cookie("token", token, {
    domain: process.env.FRONTENT_DOMAIN,
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.json({ token });
};
module.exports = login;
