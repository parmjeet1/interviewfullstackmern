const { default: mongoose } = require("mongoose");

const adminSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    profileImage: { type: String, default: "/uploads/profile.webp" },
    role:{type:String,enum: ["admin"],default:"admin"},
    lastLoggedIn:{type:Date,default:Date.now}
},{timestamps:true}
)

const AdminModel=mongoose.model("admin",adminSchema);
module.exports=AdminModel;