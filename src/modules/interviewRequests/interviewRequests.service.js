import { prisma } from '../../config/db.js';

async function createInterviewRequest(payload) {
  return prisma.interviewRequest.create({
    data: {
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email.toLowerCase(),
      organizationName: payload.organizationName,
      organizationWebsite: payload.organizationWebsite || null,
      phone: payload.phone,
      interviewerName: payload.interviewerName,
      purpose: payload.purpose,
      duration: payload.duration,
      mediaType: payload.mediaType,
      interviewType: payload.interviewType,
      requestedDate: payload.requestedDate,
      alternateDate: payload.alternateDate ?? null,
      primaryTopic: payload.primaryTopic || null,
      additionalInformation: payload.additionalInformation,
    },
  });
}

async function listInterviewRequests() {
  return prisma.interviewRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

async function getInterviewRequestById(requestId) {
  const request = await prisma.interviewRequest.findUnique({
    where: { id: requestId },
  });
  if (!request) {
    const error = new Error('Interview request not found.');
    error.statusCode = 404;
    throw error;
  }
  return request;
}

async function updateInterviewRequestStatus(requestId, payload) {
  await getInterviewRequestById(requestId);
  return prisma.interviewRequest.update({
    where: { id: requestId },
    data: {
      status: payload.status,
      adminNotes: payload.adminNotes ?? null,
      reviewedAt: new Date(),
    },
  });
}

export {
  createInterviewRequest,
  listInterviewRequests,
  getInterviewRequestById,
  updateInterviewRequestStatus,
};
