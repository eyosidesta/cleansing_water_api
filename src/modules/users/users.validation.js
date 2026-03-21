import { z } from 'zod';
import { ROLES } from '../../common/constants/roles.js';

const createUserSchema = z.object({
  fullName: z.string().trim().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum([ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.EDITOR]),
});

const userParamsSchema = z.object({
  userId: z.coerce.number().int().positive(),
});

export { createUserSchema, userParamsSchema };
