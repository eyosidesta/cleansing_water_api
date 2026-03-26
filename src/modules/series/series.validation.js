import { z } from 'zod';

const createSeriesSchema = z.object({
  title: z.string().trim().min(2),
  description: z.string().trim().min(10),
});

const updateSeriesSchema = createSeriesSchema.partial();

const seriesParamsSchema = z.object({
  seriesId: z.coerce.number().int().positive(),
});

export { createSeriesSchema, updateSeriesSchema, seriesParamsSchema };
