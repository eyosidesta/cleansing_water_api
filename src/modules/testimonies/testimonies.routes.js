import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  createTestimonyController,
  deleteTestimonyController,
  getTestimonyByIdController,
  listTestimoniesController,
  updateTestimonyController,
} from './testimonies.controller.js';
import {
  createTestimonySchema,
  testimonyParamsSchema,
  updateTestimonySchema,
} from './testimonies.validation.js';

const testimonyRoutes = Router();

testimonyRoutes.get('/', listTestimoniesController);
testimonyRoutes.get('/:testimonyId', validate(testimonyParamsSchema, 'params'), getTestimonyByIdController);

testimonyRoutes.post('/', requireAuth, validate(createTestimonySchema), createTestimonyController);
testimonyRoutes.patch(
  '/:testimonyId',
  requireAuth,
  validate(testimonyParamsSchema, 'params'),
  validate(updateTestimonySchema),
  updateTestimonyController,
);
testimonyRoutes.delete(
  '/:testimonyId',
  requireAuth,
  validate(testimonyParamsSchema, 'params'),
  deleteTestimonyController,
);

export { testimonyRoutes };
