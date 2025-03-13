const { default: mongoose } = require("mongoose");

const studentSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
    password:{type:String,required:true},
    profileImage:{type:String,required:true},
    gender:{type:String, enum: ["Male", "Female", "Other"],required:true},
    phone:{type:String,required:true},
    qualification:{type:[String]},
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref: "admin"}
},{timestamps:true}
)

const StudentModel=mongoose.model("student",studentSchema);
module.exports=StudentModel;