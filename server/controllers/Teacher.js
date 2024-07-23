import Course from '../models/Course.js'
import Teacher from '../models/Teacher.js';

const addCourse = async (req,res)=>{
    try {
        console.log(req.body)
        const course = await Course.findOne({teacher:req.body.userId,title:req.body.title});
        if(course){
            return res.status(409).json({message:"Course with the same title already exists"});
        }
        const newCourse = await Course.create({
            title:req.body.title,
            description: req.body.description,
            teacher : req.body.userId
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

export { addCourse }