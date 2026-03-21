import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  createUserController,
  deleteUserController,
  listUsersController,
} from './users.controller.js';
import { createUserSchema, userParamsSchema } from './users.validation.js';

const userRoutes = Router();

userRoutes.use(requireAuth);
userRoutes.get('/', listUsersController);
userRoutes.post('/', validate(createUserSchema), createUserController);
userRoutes.delete('/:userId', validate(userParamsSchema, 'params'), deleteUserController);

export { userRoutes };
