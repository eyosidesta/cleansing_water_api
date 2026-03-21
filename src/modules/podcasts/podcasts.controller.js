import {
  createPodcast,
  deletePodcast,
  getPodcastById,
  listPodcasts,
  updatePodcast,
} from './podcasts.service.js';

async function listPodcastsController(_req, res, next) {
  try {
    const podcasts = await listPodcasts();
    res.status(200).json(podcasts);
  } catch (error) {
    next(error);
  }
}

async function getPodcastByIdController(req, res, next) {
  try {
    const podcast = await getPodcastById(req.validated.params.podcastId);
    res.status(200).json(podcast);
  } catch (error) {
    next(error);
  }
}

async function createPodcastController(req, res, next) {
  try {
    const podcast = await createPodcast(req.validated.body, req.user.sub);
    res.status(201).json(podcast);
  } catch (error) {
    next(error);
  }
}

async function updatePodcastController(req, res, next) {
  try {
    const podcast = await updatePodcast(req.validated.params.podcastId, req.validated.body);
    res.status(200).json(podcast);
  } catch (error) {
    next(error);
  }
}

async function deletePodcastController(req, res, next) {
  try {
    const result = await deletePodcast(req.validated.params.podcastId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export {
  listPodcastsController,
  getPodcastByIdController,
  createPodcastController,
  updatePodcastController,
  deletePodcastController,
};
