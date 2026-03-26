import { prisma } from '../../config/db.js';
import { toSlug } from '../../common/utils/slug.js';

async function buildUniqueSlug(title, excludedId = null) {
  const base = toSlug(title);
  let slug = base || `series-${Date.now()}`;
  let counter = 1;

  // Ensure slug uniqueness while still keeping readable URLs.
  while (true) {
    const existing = await prisma.podcastSeries.findUnique({ where: { slug } });
    if (!existing || existing.id === excludedId) {
      return slug;
    }
    counter += 1;
    slug = `${base}-${counter}`;
  }
}

async function listSeries() {
  return prisma.podcastSeries.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { podcasts: true },
      },
    },
  });
}

async function getSeriesById(seriesId) {
  const series = await prisma.podcastSeries.findUnique({
    where: { id: seriesId },
    include: {
      podcasts: {
        orderBy: { publishedAt: 'desc' },
      },
      _count: {
        select: { podcasts: true },
      },
    },
  });

  if (!series) {
    const error = new Error('Series not found.');
    error.statusCode = 404;
    throw error;
  }

  return series;
}

async function createSeries(payload) {
  const slug = await buildUniqueSlug(payload.title);
  return prisma.podcastSeries.create({
    data: {
      title: payload.title,
      description: payload.description,
      slug,
    },
    include: {
      _count: {
        select: { podcasts: true },
      },
    },
  });
}

async function updateSeries(seriesId, payload) {
  const existing = await prisma.podcastSeries.findUnique({
    where: { id: seriesId },
    select: { id: true, title: true },
  });
  if (!existing) {
    const error = new Error('Series not found.');
    error.statusCode = 404;
    throw error;
  }

  const data = { ...payload };
  if (payload.title) {
    data.slug = await buildUniqueSlug(payload.title, seriesId);
  }

  return prisma.podcastSeries.update({
    where: { id: seriesId },
    data,
    include: {
      _count: {
        select: { podcasts: true },
      },
    },
  });
}

async function deleteSeries(seriesId) {
  await getSeriesById(seriesId);
  await prisma.podcastSeries.delete({ where: { id: seriesId } });
  return { deleted: true, id: seriesId };
}

export { listSeries, getSeriesById, createSeries, updateSeries, deleteSeries };
