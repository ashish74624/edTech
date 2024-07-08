import Student from '../models/Student.js'
import Teacher from '../models/Teacher.js'
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
        return res.status(500).json({message:"Unable to login at the moment"});
    }
}

const register = async(req,res)=>{
    try {
        const newPassword = await bcrypt.hash(req.body.password,10);
        const userType = req.body.userType;
        if(userType==='TEACHER'){
            const teacher = await Teacher.create({
                firstName:req.body.firstName,
                lastName: req.body.lastName,
                email:req.body.email,
                password: newPassword,  
            })
            await teacher.save();
            return res.status(201).json({message:"Teacher account created",userData:teacher});
        }
        
        const student = await Student.create({
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            email:req.body.email,
            password: newPassword
        })
        await student.save();
        return res.status(201).json({message:"Student account created",userData:student});
        
    } catch (error) {
        return res.status(500).json({message:"Unable to register at the moment"});
    }
}

export { login, register }