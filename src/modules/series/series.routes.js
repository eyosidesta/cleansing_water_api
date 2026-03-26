import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  createSeriesController,
  deleteSeriesController,
  getSeriesByIdController,
  listSeriesController,
  updateSeriesController,
} from './series.controller.js';
import {
  createSeriesSchema,
  seriesParamsSchema,
  updateSeriesSchema,
} from './series.validation.js';

const seriesRoutes = Router();

seriesRoutes.get('/', listSeriesController);
seriesRoutes.get('/:seriesId', validate(seriesParamsSchema, 'params'), getSeriesByIdController);

seriesRoutes.post('/', requireAuth, validate(createSeriesSchema), createSeriesController);
seriesRoutes.patch(
  '/:seriesId',
  requireAuth,
  validate(seriesParamsSchema, 'params'),
  validate(updateSeriesSchema),
  updateSeriesController,
);
seriesRoutes.delete(
  '/:seriesId',
  requireAuth,
  validate(seriesParamsSchema, 'params'),
  deleteSeriesController,
);

export { seriesRoutes };
