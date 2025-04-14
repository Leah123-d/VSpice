import express from 'express';
import { analyzeImage } from '../controllers/visionTempController.js';

const router = express.Router();

router.post('/', analyzeImage)

export default router;
