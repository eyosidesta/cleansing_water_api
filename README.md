# Cleansing Water Ministry Backend

Node.js/Express API for authentication, role-based user management, podcasts, and articles.

## Setup

1. Copy `.env.example` to `.env` and fill values.
2. Run migrations:
   - `npm run prisma:migrate`
3. Generate Prisma client:
   - `npm run prisma:generate`
4. Bootstrap first super admin:
   - `npm run bootstrap:super-admin`
5. Start dev server:
   - `npm run dev`

## Implemented Modules

- Auth: `POST /api/auth/login`
- Users:
  - `GET /api/users`
  - `POST /api/users`
  - `DELETE /api/users/:userId`
- Podcasts:
  - Public: `GET /api/podcasts`, `GET /api/podcasts/:podcastId`
  - Protected: `POST`, `PATCH`, `DELETE /api/podcasts/:podcastId`
- Articles:
  - Public: `GET /api/articles`, `GET /api/articles/:articleId`
  - Protected: `POST`, `PATCH`, `DELETE /api/articles/:articleId`

## Role Rules

- Create:
  - `super_admin` -> `super_admin`, `admin`, `editor`
  - `admin` -> `admin`, `editor`
  - `editor` -> `editor`
- Delete:
  - `super_admin` -> `admin`, `editor`
  - `admin` -> `editor`
  - `editor` -> none

## Notes

- Podcast requires YouTube URL and extracts the video ID.
- If `coverImageUrl` is missing, frontend can use returned `fallbackThumbnailUrl`.
- Article responses include `contentParagraphs` derived from new lines in `contentRaw`.
