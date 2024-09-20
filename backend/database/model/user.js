const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: Object,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    personalDetails: [
      {
        profilePic: {
          type: String,
          required: true,
        },
        bio: {
          type: String,
          required: true,
        },
      },
    ],
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: true,
      },
    ],
    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
      },
    ],
    followings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);
const user = mongoose.model("users", userSchema);
module.exports = user;
