const User = require("../../database/model/user");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../../tokengeneration/tokengeneration");
const env = require("dotenv");
env.config();
const signup = async (req, res) => {
  try {
    if (!(req.body.email && req.body.password && req.body.fullname)) {
      res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email: req.body.email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      fullName: req.body.fullname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createSecretToken(user._id);

    res.cookie("token", token, {
      domain: process.env.FRONTENT_DOMAIN,
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    console.log("cookie set succesfully");

    res.json(user);
  } catch (error) {
    console.log("Gott an error", error);
  }
};
module.exports = signup;
