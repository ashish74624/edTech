import express from 'express';
import { subscribe, Unsubscribe, mySubscriptions, getSubInfo } from '../controllers/Student.js';

const router = express.Router();

router.put('/subscribe',subscribe);
router.put('/Unsubscribe',Unsubscribe);
router.get('/mySubscriptions/:studentId',mySubscriptions)
router.get('/getSubInfo/:studentId/:teacherId',getSubInfo)
export default router;