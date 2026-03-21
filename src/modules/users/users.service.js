import bcrypt from 'bcryptjs';
import { prisma } from '../../config/db.js';
import { canCreateRole, canDeleteRole } from '../../common/constants/roles.js';

async function listUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
  return users;
}

async function createUser(actorRole, payload) {
  if (!canCreateRole(actorRole, payload.role)) {
    const error = new Error(`Forbidden: ${actorRole} cannot create ${payload.role}.`);
    error.statusCode = 403;
    throw error;
  }

  const existing = await prisma.user.findUnique({
    where: { email: payload.email.toLowerCase() },
    select: { id: true },
  });
  if (existing) {
    const error = new Error('User with this email already exists.');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(payload.password, 12);
  const user = await prisma.user.create({
    data: {
      fullName: payload.fullName,
      email: payload.email.toLowerCase(),
      passwordHash,
      role: payload.role,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}

async function deleteUser(actorRole, userId) {
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, role: true, email: true },
  });

  if (!target) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }

  if (!canDeleteRole(actorRole, target.role)) {
    const error = new Error(`Forbidden: ${actorRole} cannot delete ${target.role}.`);
    error.statusCode = 403;
    throw error;
  }

  await prisma.user.delete({ where: { id: userId } });
  return { deleted: true, id: userId, email: target.email };
}

export { listUsers, createUser, deleteUser };
