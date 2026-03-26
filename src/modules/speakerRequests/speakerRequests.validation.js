import { z } from 'zod';

const createSpeakerRequestSchema = z
  .object({
    organizationName: z.string().trim().min(2),
    organizationWebsite: z.string().url().optional().or(z.literal('')),
    firstName: z.string().trim().min(2),
    lastName: z.string().trim().min(2),
    email: z.string().email(),
    confirmEmail: z.string().email(),
    phone: z.string().trim().min(7),
    eventDate: z.coerce.date(),
    alternateDate: z.coerce.date().optional().nullable(),
    venueName: z.string().trim().min(2),
    locationAddress: z.string().trim().min(4),
    locationCity: z.string().trim().min(2),
    locationState: z.string().trim().min(2),
    locationPostalCode: z.string().trim().min(2),
    locationCountry: z.string().trim().min(2),
    speakingDuration: z.string().trim().min(2),
    eventDescription: z.string().trim().min(10),
    primaryTopic: z.string().trim().optional().or(z.literal('')),
    additionalInformation: z.string().trim().optional().or(z.literal('')),
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

const speakerRequestParamsSchema = z.object({
  requestId: z.coerce.number().int().positive(),
});

const updateSpeakerRequestStatusSchema = z.object({
  status: z.enum(['NEW', 'IN_REVIEW', 'FOLLOW_UP', 'ACCEPTED', 'DECLINED']),
  adminNotes: z.string().trim().optional(),
});

export {
  createSpeakerRequestSchema,
  speakerRequestParamsSchema,
  updateSpeakerRequestStatusSchema,
};
