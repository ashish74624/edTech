import express from 'express';
import { addCourse } from '../controllers/Teacher.js';

const router = express.Router();

router.post('/addCourse',addCourse);

export default router;