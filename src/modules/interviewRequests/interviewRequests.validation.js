import { z } from 'zod';

const createInterviewRequestSchema = z
  .object({
    firstName: z.string().trim().min(2),
    lastName: z.string().trim().min(2),
    email: z.string().email(),
    confirmEmail: z.string().email(),
    organizationName: z.string().trim().min(2),
    organizationWebsite: z.string().url().optional().or(z.literal('')),
    phone: z.string().trim().min(7),
    interviewerName: z.string().trim().min(2),
    purpose: z.string().trim().min(10),
    duration: z.string().trim().min(2),
    mediaType: z.enum([
      'TELEVISION',
      'RADIO',
      'PRINT',
      'PODCAST',
      'ONLINE_VIDEO',
      'ONLINE_ARTICLE',
      'OTHER',
    ]),
    interviewType: z.enum(['LIVE', 'RECORDED']),
    requestedDate: z.coerce.date(),
    alternateDate: z.coerce.date().optional().nullable(),
    primaryTopic: z.string().trim().optional().or(z.literal('')),
    additionalInformation: z.string().trim().min(10),
    humanCheck: z.boolean(),
  })
  .refine((value) => value.email === value.confirmEmail, {
    message: 'Email and confirm email must match.',
    path: ['confirmEmail'],
  })
  .refine((value) => value.humanCheck === true, {
    message: 'Please confirm you are human.',
    path: ['humanCheck'],
  });

const interviewRequestParamsSchema = z.object({
  requestId: z.coerce.number().int().positive(),
});

const updateInterviewRequestStatusSchema = z.object({
  status: z.enum(['NEW', 'IN_REVIEW', 'FOLLOW_UP', 'ACCEPTED', 'DECLINED']),
  adminNotes: z.string().trim().optional(),
});

export {
  createInterviewRequestSchema,
  interviewRequestParamsSchema,
  updateInterviewRequestStatusSchema,
};
