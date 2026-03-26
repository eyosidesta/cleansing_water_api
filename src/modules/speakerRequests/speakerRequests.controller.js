import {
  createSpeakerRequest,
  getSpeakerRequestById,
  listSpeakerRequests,
  updateSpeakerRequestStatus,
} from './speakerRequests.service.js';

async function createSpeakerRequestController(req, res, next) {
  try {
    const created = await createSpeakerRequest(req.validated.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

async function listSpeakerRequestsController(_req, res, next) {
  try {
    const items = await listSpeakerRequests();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
}

async function getSpeakerRequestByIdController(req, res, next) {
  try {
    const item = await getSpeakerRequestById(req.validated.params.requestId);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

async function updateSpeakerRequestStatusController(req, res, next) {
  try {
    const item = await updateSpeakerRequestStatus(req.validated.params.requestId, req.validated.body);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

export {
  createSpeakerRequestController,
  listSpeakerRequestsController,
  getSpeakerRequestByIdController,
  updateSpeakerRequestStatusController,
};
