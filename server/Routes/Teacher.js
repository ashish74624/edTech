import express from 'express';
import { addCourse, getTeacherData } from '../controllers/Teacher.js';

const router = express.Router();

router.post('/addCourse',addCourse);
router.get('/getTeacherData/:teacherId',getTeacherData);

export default router;