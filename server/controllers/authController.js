const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const AdminModel = require("../models/AdminModel");
require("dotenv").config();


const adminRegistration = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields cannot be empty",
            });
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        const existEmail = await AdminModel.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ 
                success:false,
                message: ` ${email}, this email already registered ` });
        }
        const hasPassword = await bcrypt.hash(password, 10);
        const newAdmin = new  AdminModel({ name, email, password: hasPassword});
        await newAdmin.save();
        res.status(200).json({
            success:true,
             message: "user Register successfully!",
              id: newAdmin._id,
              name:newAdmin.name,
              email:newAdmin.email });

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Internal error",
            error: error });

    }
};

const adminLogin = async (req, res) => {
    try{

        const { email, password } = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }
        const admin = await AdminModel.findOne({email});
        if (!admin) {
            return res.status(400).json({
                success:false,
                message: "Invalid credentials"
             });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({
                success:false, 
                message: "password does not match" });
        }
        const token = jwt.sign({ id: admin._id, role: admin.role }, 
            process.env.JWT_SECRET, { expiresIn: "1h" });
            
            admin.lastLoggedIn = new Date();
            await admin.save();


    return res.status(200).json({
        success:true,
        message:"login successfully!",
        token:token, 
        adminId:admin._id})

    }catch(error){
       return res.status(400).json({"internal error":error});
    }
}

const logoutAdmin = async (req, res) => {
    try {
      return res.status(200).json({
        success: true,
        message: "Logged out successfully!"
      });
  
    } catch (error) {
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };

module.exports = {
    adminLogin,
    adminRegistration,logoutAdmin}