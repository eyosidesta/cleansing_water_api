import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

function requireAuth(req, _res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    const error = new Error('Unauthorized: missing token.');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    req.user = payload;
    return next();
  } catch (_error) {
    const error = new Error('Unauthorized: invalid token.');
    error.statusCode = 401;
    return next(error);
  }
}

export { requireAuth };
