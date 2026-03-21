import { Router } from 'express';
import { validate } from '../../middleware/validate.middleware.js';
import { loginController } from './auth.controller.js';
import { loginSchema } from './auth.validation.js';

const authRoutes = Router();

authRoutes.post('/login', validate(loginSchema), loginController);

export { authRoutes };
