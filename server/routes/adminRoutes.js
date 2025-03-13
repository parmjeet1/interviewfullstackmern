const express = require("express");
const {  updateProfilePicture } = require("../controllers/adminController");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../config/multer");
const { getAdminProfile } = require("../controllers/adminController");

const router = express.Router();


router.get("/profile", verifyToken, getAdminProfile);
router.put("/update-profile", verifyToken, upload.single("profileImage"), updateProfilePicture);


module.exports = router;
