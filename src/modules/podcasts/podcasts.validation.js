import { z } from 'zod';

const createPodcastSchema = z.object({
  youtubeUrl: z.string().url(),
  coverImageUrl: z.string().url().optional().nullable(),
  title: z.string().trim().min(3),
  description: z.string().trim().min(10),
  publishedAt: z.coerce.date(),
  speakerName: z.string().trim().min(2).optional(),
  seriesId: z.number().int().positive().nullable().optional(),
});

const updatePodcastSchema = createPodcastSchema.partial();

const podcastParamsSchema = z.object({
  podcastId: z.coerce.number().int().positive(),
});

export { createPodcastSchema, updatePodcastSchema, podcastParamsSchema };
