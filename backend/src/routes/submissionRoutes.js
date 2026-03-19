import { Router } from 'express';
import { submitForm } from '../controllers/submissionController.js';
import { upload } from '../utils/multer.js';

const router = Router();

router.post(
  '/:id',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'signature', maxCount: 1 },
  ]),
  submitForm
);

export default router;
