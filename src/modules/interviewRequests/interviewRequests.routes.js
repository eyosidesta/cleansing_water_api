import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  createInterviewRequestController,
  getInterviewRequestByIdController,
  listInterviewRequestsController,
  updateInterviewRequestStatusController,
} from './interviewRequests.controller.js';
import {
  createInterviewRequestSchema,
  interviewRequestParamsSchema,
  updateInterviewRequestStatusSchema,
} from './interviewRequests.validation.js';

const interviewRequestsRoutes = Router();

interviewRequestsRoutes.post('/', validate(createInterviewRequestSchema), createInterviewRequestController);
interviewRequestsRoutes.get('/', requireAuth, listInterviewRequestsController);
interviewRequestsRoutes.get(
  '/:requestId',
  requireAuth,
  validate(interviewRequestParamsSchema, 'params'),
  getInterviewRequestByIdController,
);
interviewRequestsRoutes.patch(
  '/:requestId/status',
  requireAuth,
  validate(interviewRequestParamsSchema, 'params'),
  validate(updateInterviewRequestStatusSchema),
  updateInterviewRequestStatusController,
);

export { interviewRequestsRoutes };
