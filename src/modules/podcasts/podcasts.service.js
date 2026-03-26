import { prisma } from '../../config/db.js';
import {
  buildYoutubeEmbedUrl,
  buildYoutubeThumbnailUrl,
  extractYoutubeVideoId,
} from '../../common/utils/youtube.js';

const DEFAULT_SPEAKER_NAME = 'Cleansing Water Ministry';

function enrichPodcast(podcast) {
  return {
    ...podcast,
    embedUrl: buildYoutubeEmbedUrl(podcast.youtubeVideoId),
    fallbackThumbnailUrl: buildYoutubeThumbnailUrl(podcast.youtubeVideoId),
    effectiveCoverImageUrl: podcast.coverImageUrl ?? buildYoutubeThumbnailUrl(podcast.youtubeVideoId),
    series: podcast.series
      ? {
          id: podcast.series.id,
          title: podcast.series.title,
          slug: podcast.series.slug,
          description: podcast.series.description,
        }
      : null,
  };
}

function validateYoutubeUrl(youtubeUrl) {
  const videoId = extractYoutubeVideoId(youtubeUrl);
  if (!videoId) {
    const error = new Error('Invalid YouTube URL.');
    error.statusCode = 400;
    throw error;
  }
  return videoId;
}

async function listPodcasts() {
  const podcasts = await prisma.podcast.findMany({
    orderBy: { publishedAt: 'desc' },
    include: { series: true },
  });
  return podcasts.map(enrichPodcast);
}

async function getPodcastById(podcastId) {
  const podcast = await prisma.podcast.findUnique({
    where: { id: podcastId },
    include: { series: true },
  });
  if (!podcast) {
    const error = new Error('Podcast not found.');
    error.statusCode = 404;
    throw error;
  }
  return enrichPodcast(podcast);
}

async function createPodcast(payload, userId) {
  const youtubeVideoId = validateYoutubeUrl(payload.youtubeUrl);
  if (payload.seriesId) {
    const series = await prisma.podcastSeries.findUnique({
      where: { id: payload.seriesId },
      select: { id: true },
    });
    if (!series) {
      const error = new Error('Series not found.');
      error.statusCode = 404;
      throw error;
    }
  }

  const podcast = await prisma.podcast.create({
    data: {
      youtubeUrl: payload.youtubeUrl,
      youtubeVideoId,
      coverImageUrl: payload.coverImageUrl ?? null,
      title: payload.title,
      description: payload.description,
      publishedAt: payload.publishedAt,
      speakerName: payload.speakerName?.trim() || DEFAULT_SPEAKER_NAME,
      seriesId: payload.seriesId ?? null,
      createdById: userId,
    },
    include: { series: true },
  });
  return enrichPodcast(podcast);
}

async function updatePodcast(podcastId, payload) {
  const existing = await prisma.podcast.findUnique({ where: { id: podcastId } });
  if (!existing) {
    const error = new Error('Podcast not found.');
    error.statusCode = 404;
    throw error;
  }

  const data = { ...payload };
  if (payload.youtubeUrl) {
    data.youtubeVideoId = validateYoutubeUrl(payload.youtubeUrl);
  }
  if (payload.speakerName !== undefined) {
    data.speakerName = payload.speakerName?.trim() || DEFAULT_SPEAKER_NAME;
  }
  if (payload.seriesId !== undefined && payload.seriesId !== null) {
    const series = await prisma.podcastSeries.findUnique({
      where: { id: payload.seriesId },
      select: { id: true },
    });
    if (!series) {
      const error = new Error('Series not found.');
      error.statusCode = 404;
      throw error;
    }
  }

  const updated = await prisma.podcast.update({
    where: { id: podcastId },
    data,
    include: { series: true },
  });
  return enrichPodcast(updated);
}

async function deletePodcast(podcastId) {
  await getPodcastById(podcastId);
  await prisma.podcast.delete({ where: { id: podcastId } });
  return { deleted: true, id: podcastId };
}

export { listPodcasts, getPodcastById, createPodcast, updatePodcast, deletePodcast };
