import express from 'express';
import { subscribe, Unsubscribe } from '../controllers/Student.js';

const router = express.Router();

router.put('/subscribe',subscribe);
router.put('/Unsubscribe',Unsubscribe);

export default router;