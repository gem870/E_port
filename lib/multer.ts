import multer from "multer";
//import path from "path";
import { Request } from "express";

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Store files in 'public/uploads'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
  },
});

// File filter with proper TypeScript types
const fileFilter = (
  req: Request, 
  file: Express.Multer.File, 
  cb: (error: Error | null, acceptFile: boolean) => void
) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "video/mp4"];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(new Error("Only images and videos are allowed"), false); // Reject file
  }
};

// Upload middleware
export const upload = multer({ storage, fileFilter });
