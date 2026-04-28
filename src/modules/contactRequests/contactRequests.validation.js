import { z } from 'zod';

const createContactRequestSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().email(),
  subject: z.string().trim().min(2),
  message: z.string().trim().min(10),
});

const contactRequestParamsSchema = z.object({
  requestId: z.coerce.number().int().positive(),
});

const updateContactRequestStatusSchema = z.object({
  status: z.enum(['NEW', 'IN_REVIEW', 'FOLLOW_UP', 'ACCEPTED', 'DECLINED']),
  adminNotes: z.string().trim().optional(),
});

export {
  createContactRequestSchema,
  contactRequestParamsSchema,
  updateContactRequestStatusSchema,
};
