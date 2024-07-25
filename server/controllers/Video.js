import Video from "../models/Video.js";
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

      res.json({ message:"DONE" });
    } catch (err) {
      res.status(500).json({ message: 'Error saving file to database' });
    }
  } else {
    res.status(400).json({ message: 'Upload failed' });
  }
}

export { addVideo }