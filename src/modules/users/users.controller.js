import { createUser, deleteUser, listUsers } from './users.service.js';

async function listUsersController(_req, res, next) {
  try {
    const users = await listUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

async function createUserController(req, res, next) {
  try {
    const user = await createUser(req.user.role, req.validated.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

async function deleteUserController(req, res, next) {
  try {
    const result = await deleteUser(req.user.role, req.validated.params.userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export { listUsersController, createUserController, deleteUserController };
