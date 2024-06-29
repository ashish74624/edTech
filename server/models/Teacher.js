import mongoose, { Schema } from 'mongoose'

const TeacherSchema = new Schema({
    firstName :{ type:String , required:true },
    lastName :{ type:String, required:true},
    email :{type:String, required:true, unique:true},
    password:{type:String,required:true},
    courses : [ { type: mongoose.Schema.Types.ObjectId , ref:'Course' , default:{} } ]
})

const Teacher = mongoose.model('Teacher',TeacherSchema);

export default Teacher;