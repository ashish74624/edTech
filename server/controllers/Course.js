import Course from '../models/Course.js'

const getCourses = async(req,res)=>{
    try {
        const courses = await Course.find({ teacher:req.params.userId })
        
        if(courses.length<=0){
            return res.staus(404).json({message:"Teacher has no courses"});
        }

        return res.status(200).json({message:"Courses found",courses:courses});

    } catch (error) {
        console.log("Some error in get courses")
        return res.status(500).json({message:"Internal Server Error"});
    }
}

export { getCourses }