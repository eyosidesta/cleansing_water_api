import {
  createInterviewRequest,
  getInterviewRequestById,
  listInterviewRequests,
  updateInterviewRequestStatus,
} from './interviewRequests.service.js';

async function createInterviewRequestController(req, res, next) {
  try {
    const created = await createInterviewRequest(req.validated.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

async function listInterviewRequestsController(_req, res, next) {
  try {
    const items = await listInterviewRequests();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
}

async function getInterviewRequestByIdController(req, res, next) {
  try {
    const item = await getInterviewRequestById(req.validated.params.requestId);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

async function updateInterviewRequestStatusController(req, res, next) {
  try {
    const item = await updateInterviewRequestStatus(req.validated.params.requestId, req.validated.body);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

export {
  createInterviewRequestController,
  listInterviewRequestsController,
  getInterviewRequestByIdController,
  updateInterviewRequestStatusController,
};
