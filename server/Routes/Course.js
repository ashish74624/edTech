import express from 'express';
import { getCourseDetail, getCourses } from '../controllers/Course.js';

const router = express.Router();

router.get('/getCourses/:userId',getCourses);
router.get('/getCourseDetail/:courseId',getCourseDetail);

export default router;