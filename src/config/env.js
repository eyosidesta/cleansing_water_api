import dotenv from 'dotenv';

dotenv.config();

const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  PORT: Number(process.env.PORT ?? 4000),
  DATABASE_URL: process.env.DATABASE_URL ?? '',
  JWT_SECRET: process.env.JWT_SECRET ?? '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN ?? '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
};

if (!env.JWT_SECRET) {
  throw new Error('Missing JWT_SECRET in environment variables.');
}

if (!env.DATABASE_URL) {
  throw new Error('Missing DATABASE_URL in environment variables.');
}

export { env };
