import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env.js';
import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware.js';
import { authRoutes } from './modules/auth/auth.routes.js';
import { userRoutes } from './modules/users/users.routes.js';
import { podcastRoutes } from './modules/podcasts/podcasts.routes.js';
import { articleRoutes } from './modules/articles/articles.routes.js';
import { seriesRoutes } from './modules/series/series.routes.js';
import { uploadsRoutes } from './modules/uploads/uploads.routes.js';
import { articleCategoriesRoutes } from './modules/articleCategories/articleCategories.routes.js';
import { speakerRequestsRoutes } from './modules/speakerRequests/speakerRequests.routes.js';
import { interviewRequestsRoutes } from './modules/interviewRequests/interviewRequests.routes.js';

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true, message: 'Cleansing Water backend is healthy.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/podcasts', podcastRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/article-categories', articleCategoriesRoutes);
app.use('/api/series', seriesRoutes);
app.use('/api/uploads', uploadsRoutes);
app.use('/api/speaker-requests', speakerRequestsRoutes);
app.use('/api/interview-requests', interviewRequestsRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
