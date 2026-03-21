import bcrypt from 'bcryptjs';
import { prisma } from '../config/db.js';
import { ROLES } from '../common/constants/roles.js';

async function run() {
  const email = process.env.BOOTSTRAP_SUPER_ADMIN_EMAIL;
  const password = process.env.BOOTSTRAP_SUPER_ADMIN_PASSWORD;
  const fullName = process.env.BOOTSTRAP_SUPER_ADMIN_NAME ?? 'Super Admin';

  if (!email || !password) {
    throw new Error(
      'Missing BOOTSTRAP_SUPER_ADMIN_EMAIL or BOOTSTRAP_SUPER_ADMIN_PASSWORD environment variables.',
    );
  }

  const existing = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    select: { id: true },
  });
  if (existing) {
    // eslint-disable-next-line no-console
    console.log('Super admin already exists for this email.');
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      role: ROLES.SUPER_ADMIN,
    },
  });
  // eslint-disable-next-line no-console
  console.log('Super admin created successfully.');
}

run()
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
