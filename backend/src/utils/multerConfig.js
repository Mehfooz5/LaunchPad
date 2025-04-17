import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Set up the storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/';
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${file.fieldname}${ext}`;
    cb(null, uniqueName);
  }
});

// Filter files by type
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['application/pdf', 'video/mp4'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type! Only PDF and MP4 are allowed.'), false);
  }
};

// Final upload middleware
export const upload = multer({
  storage,
  fileFilter
});
