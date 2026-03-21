import { login } from './auth.service.js';

async function loginController(req, res, next) {
  try {
    const result = await login(req.validated.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export { loginController };
