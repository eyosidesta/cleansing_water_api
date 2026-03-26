import { z } from 'zod';

const createArticleSchema = z.object({
  title: z.string().trim().min(3),
  excerpt: z.string().trim().min(10),
  categoryId: z.number().int().positive().nullable().optional(),
  contentRaw: z.string().trim().min(10),
  authorName: z.string().trim().min(2).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
});

const updateArticleSchema = createArticleSchema.partial();

const articleParamsSchema = z.object({
  articleId: z.coerce.number().int().positive(),
});

export { createArticleSchema, updateArticleSchema, articleParamsSchema };
