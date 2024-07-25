import Video from "../models/Video.js";
import Course from "../models/Course.js";
import cloudinary from "../config/cloudinary.js";


const addVideo = async(req,res)=>{
    if (req.file) {
    try {
      const file = new Video({
        title: req.body.title,
        description: req.body.description,
        course: req.body.courseId,
        url: req.file.path,
      });
      await file.save();

      await Course.updateOne({_id:req.body.courseId},{
        $push :{videos:file._id}
      })

      res.json({ message:"DONE" });
    } catch (err) {
      res.status(500).json({ message: 'Error saving file to database' });
    }
} else {
    res.status(400).json({ message: 'Upload failed' });
  }
}

const getCourseVideo = async(req,res)=>{
    try {
        const videos = await Video.find({course: req.params.courseId}) 
        if(videos.length<=0){
            return res.status(404).json({ message : "No Videos uploaded in this course" })
        }
        return res.status(200).json({ message : "Videos Sent", videos:videos })
    } catch (error) {
        res.status(500).json({ message: 'Error fetching videos' });
    }
}

export { addVideo, getCourseVideo }