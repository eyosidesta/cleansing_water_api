import multer from 'multer';
import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { uploadPodcastCoverController, uploadTestimonyImageController } from './uploads.controller.js';

const uploadsRoutes = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      callback(null, true);
      return;
    }

    const error = new Error('Only jpeg, png, and webp image formats are allowed.');
    error.statusCode = 400;
    callback(error);
  },
});

uploadsRoutes.post('/podcast-cover', requireAuth, upload.single('image'), uploadPodcastCoverController);
uploadsRoutes.post('/testimony-image', requireAuth, upload.single('image'), uploadTestimonyImageController);

export { uploadsRoutes };
