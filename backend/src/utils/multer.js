import fs from 'fs';
import path from 'path';
import multer from 'multer';

const uploadDirectory = path.resolve('uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDirectory);
  },
  filename: (_req, file, callback) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, '-');
    callback(null, `${timestamp}-${safeName}`);
  },
});

export const upload = multer({ storage });
