import {
  createArticleCategory,
  deleteArticleCategory,
  getArticleCategoryById,
  listArticleCategories,
  updateArticleCategory,
} from './articleCategories.service.js';

async function listArticleCategoriesController(_req, res, next) {
  try {
    const categories = await listArticleCategories();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
}

async function getArticleCategoryByIdController(req, res, next) {
  try {
    const category = await getArticleCategoryById(req.validated.params.categoryId);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

async function createArticleCategoryController(req, res, next) {
  try {
    const category = await createArticleCategory(req.validated.body);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
}

async function updateArticleCategoryController(req, res, next) {
  try {
    const category = await updateArticleCategory(req.validated.params.categoryId, req.validated.body);
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
}

async function deleteArticleCategoryController(req, res, next) {
  try {
    const result = await deleteArticleCategory(req.validated.params.categoryId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export {
  listArticleCategoriesController,
  getArticleCategoryByIdController,
  createArticleCategoryController,
  updateArticleCategoryController,
  deleteArticleCategoryController,
};
