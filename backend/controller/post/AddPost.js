const User = require("../../database/model/user");
const Post = require("../../database/model/post");
const jwt = require("jsonwebtoken");
const { BlobServiceClient } = require("@azure/storage-blob");

require("dotenv").config();
const addPost = async (req, res) => {
  const token = req.cookies.token;

  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING;
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerName = process.env.CONTAINER_NAME;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  try {
    if (!token) {
      return res.json({ status: false });
    }
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const userId = verifiedUser.id;
    const user = await User.findById(userId);

    const blobName = `${Date.now()}-${req.file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const data = req.file.buffer;
    await blockBlobClient.upload(data, data.length);

    const imageUrl = blockBlobClient.url;
    const post = {
      post: imageUrl,
      content: req.body.content,
      createdBy: user._id,
    };
    const newPost = new Post(post);
    await newPost.save();

    user.post.push(newPost._id);
    user.save();
    res.status(200).json({ post: post, user: user });
  } catch (error) {
    res.status(400).json({ message: "Blog did not created" });
  }
};
module.exports = addPost;
