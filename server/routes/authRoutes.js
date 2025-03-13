const express = require("express");
const { adminRegistration, adminLogin, logoutAdmin } = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();


router.post("/register", adminRegistration); 
router.post("/login", adminLogin); 
router.post("/logout", verifyToken, logoutAdmin);

module.exports = router;
