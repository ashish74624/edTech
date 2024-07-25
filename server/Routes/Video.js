import express from 'express';
import { addVideo } from '../controllers/Video.js';
import cloudinary from '../config/cloudinary.js'
import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = 'uploads'; // Default folder
    let resource_type = 'auto'; // Let Cloudinary determine the resource type

    if (file.mimetype.startsWith('video/')) {
      folder = 'videos';
    }

    return {
      folder: folder,
      resource_type: resource_type,
    };
  },
});

const upload = multer({ storage: storage });

router.post('/addVideo', upload.single('file'), addVideo);

export default router;