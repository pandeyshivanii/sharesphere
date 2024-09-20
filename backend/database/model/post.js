const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        reply: [
          {
            user: {
              type: mongoose.Schema.Types.String,
              ref: "users",
              required: true,
            },
            replyText: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);
const blogs = mongoose.model("posts", postSchema);
module.exports = blogs;
