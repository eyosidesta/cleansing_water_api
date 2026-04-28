import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  createContactRequestController,
  getContactRequestByIdController,
  listContactRequestsController,
  updateContactRequestStatusController,
} from './contactRequests.controller.js';
import {
  contactRequestParamsSchema,
  createContactRequestSchema,
  updateContactRequestStatusSchema,
} from './contactRequests.validation.js';

const contactRequestsRoutes = Router();

contactRequestsRoutes.post('/', validate(createContactRequestSchema), createContactRequestController);
contactRequestsRoutes.get('/', requireAuth, listContactRequestsController);
contactRequestsRoutes.get(
  '/:requestId',
  requireAuth,
  validate(contactRequestParamsSchema, 'params'),
  getContactRequestByIdController,
);
contactRequestsRoutes.patch(
  '/:requestId/status',
  requireAuth,
  validate(contactRequestParamsSchema, 'params'),
  validate(updateContactRequestStatusSchema),
  updateContactRequestStatusController,
);

export { contactRequestsRoutes };
