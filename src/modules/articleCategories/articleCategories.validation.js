import { z } from 'zod';

const createArticleCategorySchema = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(10),
});

const updateArticleCategorySchema = createArticleCategorySchema.partial();

const articleCategoryParamsSchema = z.object({
  categoryId: z.coerce.number().int().positive(),
});

export { createArticleCategorySchema, updateArticleCategorySchema, articleCategoryParamsSchema };
