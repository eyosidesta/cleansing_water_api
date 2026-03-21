import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware.js';
import { validate } from '../../middleware/validate.middleware.js';
import {
  createArticleController,
  deleteArticleController,
  getArticleByIdController,
  listArticlesController,
  updateArticleController,
} from './articles.controller.js';
import {
  articleParamsSchema,
  createArticleSchema,
  updateArticleSchema,
} from './articles.validation.js';

const articleRoutes = Router();

articleRoutes.get('/', listArticlesController);
articleRoutes.get('/:articleId', validate(articleParamsSchema, 'params'), getArticleByIdController);

articleRoutes.post('/', requireAuth, validate(createArticleSchema), createArticleController);
articleRoutes.patch(
  '/:articleId',
  requireAuth,
  validate(articleParamsSchema, 'params'),
  validate(updateArticleSchema),
  updateArticleController,
);
articleRoutes.delete(
  '/:articleId',
  requireAuth,
  validate(articleParamsSchema, 'params'),
  deleteArticleController,
);

export { articleRoutes };
