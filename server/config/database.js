const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, {
          
        });
       

        console.log(`MongoDB connected successfully: `);
    } catch (error) {
        console.error("Database connection error:", error); 
        process.exit(1); 
    }
};


module.exports = connectDB;