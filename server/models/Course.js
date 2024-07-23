import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
    title: {type:String,required:true},
    description : {type:String,required:true},
    teacher :{ type : mongoose.Schema.Types.ObjectId , ref:'Teacher', required:true },
    videos : [{type: mongoose.Schema.Types.ObjectId , ref :'Video', default :{}}],
    isFree : { type:Boolean, required:true , default : true },
    createdAt : {type:Date, default : Date.now()},
    thumbnail :{type:String }
})

const Course = mongoose.model('Course',CourseSchema);

export default Course;