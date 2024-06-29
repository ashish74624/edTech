import mongoose, { Schema } from "mongoose";

const StudentSchema = new Schema({
    firstName :{ type:String , required:true },
    lastName :{ type:String, required:true},
    email :{type:String, required:true, unique:true},
    password:{type:String,required:true},
    subscriptions : [{ type: mongoose.Schema.Types.ObjectId , ref :'Teacher' , default :{} }]
})

const Student = mongoose.model('Student',StudentSchema);

export default Student;