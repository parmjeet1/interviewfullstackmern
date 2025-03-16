const bcrypt = require("bcrypt");
const StudentModel = require("../models/StudentModel");
const fs = require("fs");
const path = require("path");

const addStudent = async (req, res) => {
    try {
      let { name, email, password, phone, qualification, gender,createdBy } = req.body;
  
      if (!name || !email || !password || !phone || !qualification || !gender) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      if (typeof qualification === "string") {
        qualification = qualification.split(",").map((q) => q.trim()); 
    }
    //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Invalid email format",
    //   });
    // }

    const existingStudent = await StudentModel.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student with this email already exists",
      });
    }
    const profileImagePath = req.file ? `/uploads/${req.file.filename}` : "/uploads/default.jpg";

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = new StudentModel({
        name,
        email,
        password: hashedPassword,
        phone,
        qualification,
        gender,
        profileImage: profileImagePath,
        createdBy
       });
      await newStudent.save();

    return res.status(201).json({
      success: true,
      message: "Student added successfully!",
      student: {
        id: newStudent._id,
        name: newStudent.name,
        email: newStudent.email,
        phone: newStudent.phone,
        qualification: newStudent.qualification,
        gender: newStudent.gender,
        profileImage: newStudent.profileImage,
      },
    });

  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllStudents = async (req, res) => {
    try {
      const students = await StudentModel.find().select("-password"); 
  
      return res.status(200).json({
        success: true,
        message: "Students retrieved successfully!",
        students,
      });
  
    } catch (error) {
      console.error("Error fetching students:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
  const deleteStudent = async (req, res) => {
    try {
      const studentId = req.params.id;
      const student = await StudentModel.findById(studentId);
      if (!student) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
  
      if (student.profileImage && !student.profileImage.includes("profile.webp")) {
        const imagePath = path.join(__dirname, "..", student.profileImage);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
  
      await StudentModel.findByIdAndDelete(studentId);
      return res.status(200).json({ success: true, message: "Student deleted successfully!" });
  
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
  const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const { name, email, phone, qualification, gender } = req.body;

        const student = await StudentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        if (email && email !== student.email) {
            const emailExists = await StudentModel.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ success: false, message: "Email already in use" });
            }
        }

        if (qualification) {
            student.qualification = Array.isArray(qualification) ? qualification : [qualification];
        }

        student.name = name || student.name;
        student.email = email || student.email;
        student.phone = phone || student.phone;
        student.gender = gender || student.gender;

        await student.save();

        return res.status(200).json({
            success: true,
            message: "Student updated successfully!",
            student,
        });

    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


module.exports = { addStudent,getAllStudents,deleteStudent,updateStudent };
