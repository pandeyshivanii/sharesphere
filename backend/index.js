const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbconnection = require("./database/dbconnection");
const authRoute = require("./routes/authRoute");
const postRoute = require("./routes/postAuth");
const userRoute = require("./routes/userRoute");
const PORT = 8000;
dbconnection();
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));

app.use((req, res, next) => {
  // Set CORS headers
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:3000"
    // "http://192.168.1.6:3000"
  ); // Replace with your frontend domain
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true"); // Allow credentials (cookies, etc.)
  next();
});

app.use("/", authRoute);
app.use("/post", postRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
