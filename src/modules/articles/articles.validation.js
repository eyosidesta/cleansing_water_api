import { z } from 'zod';

const createArticleSchema = z.object({
  coverImageUrl: z.string().url().optional().nullable(),
  title: z.string().trim().min(3),
  description: z.string().trim().min(10),
  contentRaw: z.string().trim().min(10),
  authorName: z.string().trim().min(2).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
});

const updateArticleSchema = createArticleSchema.partial();

const articleParamsSchema = z.object({
  articleId: z.coerce.number().int().positive(),
});

export { createArticleSchema, updateArticleSchema, articleParamsSchema };
