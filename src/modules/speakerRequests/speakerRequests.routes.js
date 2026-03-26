import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  createSpeakerRequestController,
  getSpeakerRequestByIdController,
  listSpeakerRequestsController,
  updateSpeakerRequestStatusController,
} from './speakerRequests.controller.js';
import {
  createSpeakerRequestSchema,
  speakerRequestParamsSchema,
  updateSpeakerRequestStatusSchema,
} from './speakerRequests.validation.js';

const speakerRequestsRoutes = Router();

speakerRequestsRoutes.post('/', validate(createSpeakerRequestSchema), createSpeakerRequestController);
speakerRequestsRoutes.get('/', requireAuth, listSpeakerRequestsController);
speakerRequestsRoutes.get(
  '/:requestId',
  requireAuth,
  validate(speakerRequestParamsSchema, 'params'),
  getSpeakerRequestByIdController,
);
speakerRequestsRoutes.patch(
  '/:requestId/status',
  requireAuth,
  validate(speakerRequestParamsSchema, 'params'),
  validate(updateSpeakerRequestStatusSchema),
  updateSpeakerRequestStatusController,
);

export { speakerRequestsRoutes };
