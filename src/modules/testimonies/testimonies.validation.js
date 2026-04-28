import { z } from 'zod';

const createTestimonySchema = z.object({
  title: z.string().trim().min(3),
  summary: z.string().trim().min(10),
  contentRaw: z.string().trim().min(10),
  authorName: z.string().trim().min(2).optional(),
  coverImageUrl: z.string().url().optional().nullable(),
  galleryImageUrls: z.array(z.string().url()).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
});

const updateTestimonySchema = createTestimonySchema.partial();

const testimonyParamsSchema = z.object({
  testimonyId: z.coerce.number().int().positive(),
});

export { createTestimonySchema, updateTestimonySchema, testimonyParamsSchema };
