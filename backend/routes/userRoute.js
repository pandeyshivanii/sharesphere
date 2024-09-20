const express = require("express");
const addFollow = require("../controller/user/addFollow");
const unfollowUser = require("../controller/user/unfollow");
const addPersonalDetails = require("../controller/user/addPersonal");
const upload = require("../azuremulter/azuremulter.js");
const getallUser = require("../controller/user/getuser.js");
const getSingleUser = require("../controller/user/getSingleuser.js");

const router = express.Router();

router.put("/addfollow", addFollow);
router.put("/addunfollow", unfollowUser);
router.put("/adddetails", upload.single("img"), addPersonalDetails);
router.get("/getalluser", getallUser);
router.get("/getuser/:id", getSingleUser);

module.exports = router;
