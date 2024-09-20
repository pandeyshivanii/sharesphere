const mongoose = require("mongoose");
const env = require("dotenv");

env.config();
const dbconnection = async () => {
  mongoose
    .connect(process.env.MONGO_DB_URL)
    .then(() => console.log("Connection to MongoDB successful"))
    .catch((err) => console.error(err));
};
module.exports = dbconnection;
