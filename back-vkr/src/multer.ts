import { Request, Response, NextFunction } from "express";
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, 'tmp_uploads/');
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Недопустимый формат файла'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('image');

export const uploadImage = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      next(err);
    } else if (err) {
      next(err);
    }
    next();
  });
};