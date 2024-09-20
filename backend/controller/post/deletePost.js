const User = require("../../database/model/user");
const Post = require("../../database/model/post");
const jwt = require("jsonwebtoken");
const { BlobServiceClient } = require("@azure/storage-blob");

const deletePost = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json("Unauthorized");
    }
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);

    const AZURE_STORAGE_CONNECTION_STRING =
      process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING;
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      AZURE_STORAGE_CONNECTION_STRING
    );
    const containerName = process.env.CONTAINER_NAME;
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const userId = verifiedUser.id;
    const user = await User.findById(userId);
    const post = await Post.findById(req.params.id);
    console.log(userId);
    if (post.createdBy == userId) {
      const postimage = decodeURIComponent(post.post.split("/")[4]);
      console.log(postimage);
      const blockBlobClient = containerClient.getBlockBlobClient(postimage);
      // console.log(blockBlobClient);
      await blockBlobClient.delete();
      console.log(`Blob "${postimage}" deleted successfully.`);
      await Post.deleteOne({ _id: req.params.id });

      user.post = user.post.filter(
        (post) => post._id.toString() !== req.params.id
      );
      await post.save();
      await user.save();
    }
  } catch (err) {
    res.status(501).json(err);
    // console.log(err);
  }
};
module.exports = deletePost;
