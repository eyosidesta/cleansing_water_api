import { prisma } from '../../config/db.js';

const DEFAULT_AUTHOR_NAME = 'Cleansing Water Ministry';
const WORDS_PER_MINUTE = 200;

function contentToParagraphs(contentRaw) {
  return contentRaw
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function enrichArticle(article) {
  return {
    ...article,
    category: article.categoryRef?.title ?? article.category ?? null,
    contentParagraphs: contentToParagraphs(article.contentRaw),
  };
}

function estimateReadTimeMinutes(contentRaw) {
  const words = contentRaw
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  if (words === 0) return null;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

async function listArticles() {
  const articles = await prisma.article.findMany({
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
    include: { categoryRef: true },
  });
  return articles.map(enrichArticle);
}

async function getArticleById(articleId) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
    include: { categoryRef: true },
  });
  if (!article) {
    const error = new Error('Article not found.');
    error.statusCode = 404;
    throw error;
  }

  return enrichArticle(article);
}

async function createArticle(payload, userId) {
  if (payload.categoryId) {
    const category = await prisma.articleCategory.findUnique({
      where: { id: payload.categoryId },
      select: { id: true, title: true },
    });
    if (!category) {
      const error = new Error('Article category not found.');
      error.statusCode = 404;
      throw error;
    }
  }

  const article = await prisma.article.create({
    data: {
      title: payload.title,
      excerpt: payload.excerpt,
      categoryId: payload.categoryId ?? null,
      contentRaw: payload.contentRaw,
      authorName: payload.authorName?.trim() || DEFAULT_AUTHOR_NAME,
      readTime: estimateReadTimeMinutes(payload.contentRaw),
      publishedAt: payload.publishedAt ?? null,
      createdById: userId,
    },
    include: { categoryRef: true },
  });
  return enrichArticle(article);
}

async function updateArticle(articleId, payload) {
  const existing = await prisma.article.findUnique({ where: { id: articleId } });
  if (!existing) {
    const error = new Error('Article not found.');
    error.statusCode = 404;
    throw error;
  }

  const data = { ...payload };
  if (payload.authorName !== undefined) {
    data.authorName = payload.authorName?.trim() || DEFAULT_AUTHOR_NAME;
  }
  if (payload.categoryId !== undefined && payload.categoryId !== null) {
    const category = await prisma.articleCategory.findUnique({
      where: { id: payload.categoryId },
      select: { id: true },
    });
    if (!category) {
      const error = new Error('Article category not found.');
      error.statusCode = 404;
      throw error;
    }
  }
  if (payload.contentRaw !== undefined) {
    data.readTime = estimateReadTimeMinutes(payload.contentRaw);
  }

  const updated = await prisma.article.update({
    where: { id: articleId },
    data,
    include: { categoryRef: true },
  });

  return enrichArticle(updated);
}

async function deleteArticle(articleId) {
  await getArticleById(articleId);
  await prisma.article.delete({ where: { id: articleId } });
  return { deleted: true, id: articleId };
}

export { listArticles, getArticleById, createArticle, updateArticle, deleteArticle };
