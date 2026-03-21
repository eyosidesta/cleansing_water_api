import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  createPodcastController,
  deletePodcastController,
  getPodcastByIdController,
  listPodcastsController,
  updatePodcastController,
} from './podcasts.controller.js';
import {
  createPodcastSchema,
  podcastParamsSchema,
  updatePodcastSchema,
} from './podcasts.validation.js';

const podcastRoutes = Router();

podcastRoutes.get('/', listPodcastsController);
podcastRoutes.get('/:podcastId', validate(podcastParamsSchema, 'params'), getPodcastByIdController);

podcastRoutes.post('/', requireAuth, validate(createPodcastSchema), createPodcastController);
podcastRoutes.patch(
  '/:podcastId',
  requireAuth,
  validate(podcastParamsSchema, 'params'),
  validate(updatePodcastSchema),
  updatePodcastController,
);
podcastRoutes.delete(
  '/:podcastId',
  requireAuth,
  validate(podcastParamsSchema, 'params'),
  deletePodcastController,
);

export { podcastRoutes };
