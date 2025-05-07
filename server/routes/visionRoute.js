import express from 'express';
import multer from "multer";
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { uploadImage, analyzeImage } from '../controllers/visionController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express.Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage });

router.post('/image', upload.single("file"), uploadImage)
router.post('/analyze', analyzeImage)

export default router;
