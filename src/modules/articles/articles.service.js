import { prisma } from '../../config/db.js';

const DEFAULT_AUTHOR_NAME = 'Cleansing Water Ministry';

function contentToParagraphs(contentRaw) {
  return contentRaw
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function enrichArticle(article) {
  return {
    ...article,
    contentParagraphs: contentToParagraphs(article.contentRaw),
  };
}

async function listArticles() {
  const articles = await prisma.article.findMany({
    orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
  });
  return articles.map(enrichArticle);
}

async function getArticleById(articleId) {
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });
  if (!article) {
    const error = new Error('Article not found.');
    error.statusCode = 404;
    throw error;
  }

  return enrichArticle(article);
}

async function createArticle(payload, userId) {
  const article = await prisma.article.create({
    data: {
      coverImageUrl: payload.coverImageUrl ?? null,
      title: payload.title,
      description: payload.description,
      contentRaw: payload.contentRaw,
      authorName: payload.authorName?.trim() || DEFAULT_AUTHOR_NAME,
      publishedAt: payload.publishedAt ?? null,
      createdById: userId,
    },
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

  const updated = await prisma.article.update({
    where: { id: articleId },
    data,
  });

  return enrichArticle(updated);
}

async function deleteArticle(articleId) {
  await getArticleById(articleId);
  await prisma.article.delete({ where: { id: articleId } });
  return { deleted: true, id: articleId };
}

export { listArticles, getArticleById, createArticle, updateArticle, deleteArticle };
