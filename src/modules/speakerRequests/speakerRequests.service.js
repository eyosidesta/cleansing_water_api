import { prisma } from '../../config/db.js';

async function createSpeakerRequest(payload) {
  return prisma.speakerRequest.create({
    data: {
      organizationName: payload.organizationName,
      organizationWebsite: payload.organizationWebsite || null,
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email.toLowerCase(),
      phone: payload.phone,
      eventDate: payload.eventDate,
      alternateDate: payload.alternateDate ?? null,
      venueName: payload.venueName,
      locationAddress: payload.locationAddress,
      locationCity: payload.locationCity,
      locationState: payload.locationState,
      locationPostalCode: payload.locationPostalCode,
      locationCountry: payload.locationCountry,
      speakingDuration: payload.speakingDuration,
      eventDescription: payload.eventDescription,
      primaryTopic: payload.primaryTopic || null,
      additionalInformation: payload.additionalInformation || null,
    },
  });
}

async function listSpeakerRequests() {
  return prisma.speakerRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

async function getSpeakerRequestById(requestId) {
  const request = await prisma.speakerRequest.findUnique({
    where: { id: requestId },
  });
  if (!request) {
    const error = new Error('Speaker request not found.');
    error.statusCode = 404;
    throw error;
  }
  return request;
}

async function updateSpeakerRequestStatus(requestId, payload) {
  await getSpeakerRequestById(requestId);
  return prisma.speakerRequest.update({
    where: { id: requestId },
    data: {
      status: payload.status,
      adminNotes: payload.adminNotes ?? null,
      reviewedAt: new Date(),
    },
  });
}

export {
  createSpeakerRequest,
  listSpeakerRequests,
  getSpeakerRequestById,
  updateSpeakerRequestStatus,
};
