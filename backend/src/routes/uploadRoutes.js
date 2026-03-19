import { Router } from 'express';
import { uploadFile } from '../controllers/uploadController.js';
import { upload } from '../utils/multer.js';

const router = Router();

router.post('/', upload.single('file'), uploadFile);

export default router;
