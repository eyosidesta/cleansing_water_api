import { prisma } from '../../config/db.js';

async function createContactRequest(payload) {
  return prisma.contactRequest.create({
    data: {
      name: payload.name,
      email: payload.email.toLowerCase(),
      subject: payload.subject,
      message: payload.message,
    },
  });
}

async function listContactRequests() {
  return prisma.contactRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

async function getContactRequestById(requestId) {
  const request = await prisma.contactRequest.findUnique({
    where: { id: requestId },
  });
  if (!request) {
    const error = new Error('Contact request not found.');
    error.statusCode = 404;
    throw error;
  }
  return request;
}

async function updateContactRequestStatus(requestId, payload) {
  await getContactRequestById(requestId);
  return prisma.contactRequest.update({
    where: { id: requestId },
    data: {
      status: payload.status,
      adminNotes: payload.adminNotes ?? null,
      reviewedAt: new Date(),
    },
  });
}

export {
  createContactRequest,
  listContactRequests,
  getContactRequestById,
  updateContactRequestStatus,
};
