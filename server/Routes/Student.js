import express from 'express';
import { subscribe, Unsubscribe, mySubscriptions } from '../controllers/Student.js';

const router = express.Router();

router.put('/subscribe',subscribe);
router.put('/Unsubscribe',Unsubscribe);
router.get('/mySubscriptions/:studentId',mySubscriptions)
export default router;