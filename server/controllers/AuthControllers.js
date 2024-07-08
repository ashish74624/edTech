import Student from '../models/Student'
import Teacher from '../models/Teacher'
import bcrypt from 'bcrypt'

const login = async(req,res) =>{
    try {
        const isStudent = await Student.find({email:req.body.email});
        const isTeacher = await Teacher.find({email:req.body.email});
        const password = req.body.password;
        if(isStudent.length<=0 && isTeacher.length<=0){
            return res.status(401).json({message:"Invalid email or password"});
        }
        else if(isStudent.length>0){
            const student = await Student.findOne({email:req.body.email});
            const pass = await bcrypt.compare(password,student.password);
            if(!pass){
                return res.status(401).json({message:"Invalid email or password"});
            }
            return res.status(200).json({message:"Student Login Succesful",userData:student,userType:"STUDENT"})
        }
        
        const teacher = await Teacher.findOne({email:req.body.email});
        const pass = await bcrypt.compare(password,teacher.password);
        if(!pass){
            return res.status(401).json({message:"Invalid email or password"});
        }
        return res.status(200).json({message:"Teacher Login Succesful",userData:teacher,userType:"TEACHER"})

    } catch (error) {
        
    }
}

export { login }