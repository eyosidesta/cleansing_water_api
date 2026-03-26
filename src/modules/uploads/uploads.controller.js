import { uploadPodcastCoverImage } from './uploads.service.js';

async function uploadPodcastCoverController(req, res, next) {
  try {
    if (!req.file) {
      const error = new Error('Image file is required.');
      error.statusCode = 400;
      throw error;
    }

    const uploaded = await uploadPodcastCoverImage(req.file);
    res.status(201).json(uploaded);
  } catch (error) {
    next(error);
  }
}

export { uploadPodcastCoverController };
