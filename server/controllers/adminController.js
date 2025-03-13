const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const AdminModel = require("../models/AdminModel");

const getAdminProfile = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.admin.id).select("-password");
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }
        const profileImageUrl = `${process.env.API_BASE_URL}/uploads/${admin.profileImage}`;

    return res.status(200).json({
      success: true,
      message: "Admin profile retrieved successfully",
      admin: {
        name: admin.name,
        email: admin.email,
        lastLoggedIn: admin.lastLoggedIn,
        profileImage:admin.profileImage
      }
    });
   

  } catch (error) {
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};



const updateProfilePicture = async (req, res) => {
    try {
        const { oldPassword, newPassword, adminId } = req.body;


        const admin = await AdminModel.findById(adminId);
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found" });
        }


        const isMatch = await bcrypt.compare(oldPassword, admin.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Old password is incorrect. Profile not updated!" });
        }

         if (newPassword) {
            admin.password = await bcrypt.hash(newPassword, 10);
        }

       
        if (req.file) {
            admin.profileImage = `/uploads/${req.file.filename}`;
        }


        await admin.save();

        return res.status(200).json({ success: true,
            profileImage:admin.profileImage,
            message: "Profile updated successfully!" });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = {
   
    
    
    updateProfilePicture,
    getAdminProfile
}

