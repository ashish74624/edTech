import express from 'express';
import { getCourseDetail, getCourses, getCourseRecomendation } from '../controllers/Course.js';

const router = express.Router();

router.get('/getCourses/:userId',getCourses);
router.get('/getCourseDetail/:courseId',getCourseDetail);
router.get('/getCourseRecomendation',getCourseRecomendation);

export default router;