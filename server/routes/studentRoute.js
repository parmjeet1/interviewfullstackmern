const express = require("express");
const { addStudent, getAllStudents, deleteStudent, updateStudent } = require("../controllers/studentController");
const verifyToken = require("../middleware/authMiddleware"); 
const upload = require("../config/multer"); 

const router = express.Router();


router.get("/all", verifyToken, getAllStudents);
router.delete("/delete/:id", verifyToken, deleteStudent);
router.put("/update/:id", verifyToken, upload.single("profilePic"), updateStudent);
router.post("/add", upload.single("profileImage"), addStudent);


module.exports = router;
