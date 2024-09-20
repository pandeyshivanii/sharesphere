const User = require("../../database/model/user");
require("dotenv").config();
const { BlobServiceClient } = require("@azure/storage-blob");
const jwt = require("jsonwebtoken");

const addPersonalDetails = async (req, res) => {
  const AZURE_STORAGE_CONNECTION_STRING =
    process.env.AZURE_BLOB_STORAGE_CONNECTION_STRING;
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerName = process.env.CONTAINER_NAME;
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const token = req.cookies.token;
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
    const personaldetails = {
      profilePic: imageUrl,
      bio: req.body.bio,
    };
    user.personalDetails.push(personaldetails);
    await user.save();

    res.status(201).json({ message: "Added successfully" });
  } catch (error) {
    res.status(404).json({ message: error });
  }
};
module.exports = addPersonalDetails;
