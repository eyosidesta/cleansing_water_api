import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  createArticleCategoryController,
  deleteArticleCategoryController,
  getArticleCategoryByIdController,
  listArticleCategoriesController,
  updateArticleCategoryController,
} from './articleCategories.controller.js';
import {
  articleCategoryParamsSchema,
  createArticleCategorySchema,
  updateArticleCategorySchema,
} from './articleCategories.validation.js';

const articleCategoriesRoutes = Router();

articleCategoriesRoutes.get('/', listArticleCategoriesController);
articleCategoriesRoutes.get(
  '/:categoryId',
  validate(articleCategoryParamsSchema, 'params'),
  getArticleCategoryByIdController,
);

articleCategoriesRoutes.post(
  '/',
  requireAuth,
  validate(createArticleCategorySchema),
  createArticleCategoryController,
);
articleCategoriesRoutes.patch(
  '/:categoryId',
  requireAuth,
  validate(articleCategoryParamsSchema, 'params'),
  validate(updateArticleCategorySchema),
  updateArticleCategoryController,
);
articleCategoriesRoutes.delete(
  '/:categoryId',
  requireAuth,
  validate(articleCategoryParamsSchema, 'params'),
  deleteArticleCategoryController,
);

export { articleCategoriesRoutes };
