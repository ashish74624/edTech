import Course from '../models/Course.js'
import Teacher from '../models/Teacher.js';
import cloudinary from '../config/cloudinary.js';

const addCourse = async (req,res)=>{
    try {
        const course = await Course.findOne({teacher:req.body.userId,title:req.body.title});
        if(course){
            return res.status(409).json({message:"Course with the same title already exists"});
        }
        
        const result = await cloudinary.uploader.upload(req.body.image);
        const newCourse = await Course.create({
            title:req.body.title,
            description: req.body.description,
            teacher : req.body.userId,
            thumbnail: result.public_id
        })
        await newCourse.save();

        const teacher = await Teacher.updateOne({_id:req.body.userId},
            { $push :{ courses: newCourse._id }}
        )

        return res.status(201).json({ message:"Course created", course:newCourse });

    } catch (error) {
        console.log("Some error in adding courses")
        return res.status(500).json({message:"Some Error with form submission"});
    }
}

const getTeacherData = async(req,res)=>{
    try {
        const teacher = await Teacher.findById(req.params.teacherId).populate('courses');
        
        if(!teacher){
            return res.status(404).json({ message:"Teacher not found" });
        }
        return res.status(200).json({message:"Teacher found",teacher:teacher});
    } catch (error) {
        return res.status(500).json({message:"Teacher data can't be fetched at the moment"});
    }
}



export { addCourse, getTeacherData }