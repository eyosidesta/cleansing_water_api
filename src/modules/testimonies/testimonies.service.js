import { prisma } from '../../config/db.js';

const DEFAULT_AUTHOR_NAME = 'Cleansing Water Ministry';

function toParagraphs(contentRaw) {
  return contentRaw
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function enrichTestimony(testimony) {
  return {
    ...testimony,
    contentParagraphs: toParagraphs(testimony.contentRaw),
  };
}

async function listTestimonies() {
  const testimonies = await prisma.testimony.findMany({
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  });
  return testimonies.map(enrichTestimony);
}

async function getTestimonyById(testimonyId) {
  const testimony = await prisma.testimony.findUnique({
    where: { id: testimonyId },
  });
  if (!testimony) {
    const error = new Error('Testimony not found.');
    error.statusCode = 404;
    throw error;
  }
  return enrichTestimony(testimony);
}

async function createTestimony(payload, userId) {
  const created = await prisma.testimony.create({
    data: {
      title: payload.title,
      summary: payload.summary,
      contentRaw: payload.contentRaw,
      authorName: payload.authorName?.trim() || DEFAULT_AUTHOR_NAME,
      coverImageUrl: payload.coverImageUrl ?? null,
      galleryImageUrls: payload.galleryImageUrls ?? [],
      publishedAt: payload.publishedAt ?? null,
      createdById: userId,
    },
  });
  return enrichTestimony(created);
}

async function updateTestimony(testimonyId, payload) {
  const existing = await prisma.testimony.findUnique({ where: { id: testimonyId } });
  if (!existing) {
    const error = new Error('Testimony not found.');
    error.statusCode = 404;
    throw error;
  }

  const data = { ...payload };
  if (payload.authorName !== undefined) {
    data.authorName = payload.authorName?.trim() || DEFAULT_AUTHOR_NAME;
  }

  const updated = await prisma.testimony.update({
    where: { id: testimonyId },
    data,
  });

  return enrichTestimony(updated);
}

async function deleteTestimony(testimonyId) {
  await getTestimonyById(testimonyId);
  await prisma.testimony.delete({ where: { id: testimonyId } });
  return { deleted: true, id: testimonyId };
}

export { listTestimonies, getTestimonyById, createTestimony, updateTestimony, deleteTestimony };
