import {
  createArticle,
  deleteArticle,
  getArticleById,
  listArticles,
  updateArticle,
} from './articles.service.js';

async function listArticlesController(_req, res, next) {
  try {
    const articles = await listArticles();
    res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
}

async function getArticleByIdController(req, res, next) {
  try {
    const article = await getArticleById(req.validated.params.articleId);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
}

async function createArticleController(req, res, next) {
  try {
    const article = await createArticle(req.validated.body, req.user.sub);
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
}

async function updateArticleController(req, res, next) {
  try {
    const article = await updateArticle(req.validated.params.articleId, req.validated.body);
    res.status(200).json(article);
  } catch (error) {
    next(error);
  }
}

async function deleteArticleController(req, res, next) {
  try {
    const result = await deleteArticle(req.validated.params.articleId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export {
  listArticlesController,
  getArticleByIdController,
  createArticleController,
  updateArticleController,
  deleteArticleController,
};
