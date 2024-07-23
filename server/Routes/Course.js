import express from 'express';
import { getCourses } from '../controllers/Course.js';

const router = express.Router();

router.get('/getCourses/:userId',getCourses);

export default router;