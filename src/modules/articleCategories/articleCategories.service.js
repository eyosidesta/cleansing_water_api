import { prisma } from '../../config/db.js';
import { toSlug } from '../../common/utils/slug.js';

async function buildUniqueSlug(title, excludedId = null) {
  const base = toSlug(title);
  let slug = base || `article-category-${Date.now()}`;
  let counter = 1;

  while (true) {
    const existing = await prisma.articleCategory.findUnique({ where: { slug } });
    if (!existing || existing.id === excludedId) return slug;
    counter += 1;
    slug = `${base}-${counter}`;
  }
}

async function listArticleCategories() {
  return prisma.articleCategory.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { articles: true } } },
  });
}

async function getArticleCategoryById(categoryId) {
  const category = await prisma.articleCategory.findUnique({
    where: { id: categoryId },
    include: {
      articles: {
        orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
      },
      _count: { select: { articles: true } },
    },
  });

  if (!category) {
    const error = new Error('Article category not found.');
    error.statusCode = 404;
    throw error;
  }

  return category;
}

async function createArticleCategory(payload) {
  const slug = await buildUniqueSlug(payload.title);
  return prisma.articleCategory.create({
    data: {
      title: payload.title,
      description: payload.description,
      slug,
    },
    include: { _count: { select: { articles: true } } },
  });
}

async function updateArticleCategory(categoryId, payload) {
  await getArticleCategoryById(categoryId);
  const data = { ...payload };
  if (payload.title) {
    data.slug = await buildUniqueSlug(payload.title, categoryId);
  }
  return prisma.articleCategory.update({
    where: { id: categoryId },
    data,
    include: { _count: { select: { articles: true } } },
  });
}

async function deleteArticleCategory(categoryId) {
  await getArticleCategoryById(categoryId);
  await prisma.articleCategory.delete({ where: { id: categoryId } });
  return { deleted: true, id: categoryId };
}

export {
  listArticleCategories,
  getArticleCategoryById,
  createArticleCategory,
  updateArticleCategory,
  deleteArticleCategory,
};
