const express = require("express");

const app = express();
const cors=require("cors");
require("dotenv").config();
const connectDB=require("./config/database")
const authRoutes = require("./routes/authRoutes");
const studentRoutes = require("./routes/studentRoute");
const adminRoutes = require("./routes/adminRoutes");

connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/uploads", express.static("uploads"));

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("server is runnning ")
})

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/students", studentRoutes);

app.use("/api/admin", adminRoutes);

const port=process.env.PORT
app.listen(port, ()=>{
    console.log( `server is runing in ${port}`  )
   
});