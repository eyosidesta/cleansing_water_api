import {
  createContactRequest,
  getContactRequestById,
  listContactRequests,
  updateContactRequestStatus,
} from './contactRequests.service.js';

async function createContactRequestController(req, res, next) {
  try {
    const created = await createContactRequest(req.validated.body);
    res.status(201).json(created);
  } catch (error) {
    next(error);
  }
}

async function listContactRequestsController(_req, res, next) {
  try {
    const items = await listContactRequests();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
}

async function getContactRequestByIdController(req, res, next) {
  try {
    const item = await getContactRequestById(req.validated.params.requestId);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

async function updateContactRequestStatusController(req, res, next) {
  try {
    const item = await updateContactRequestStatus(req.validated.params.requestId, req.validated.body);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

export {
  createContactRequestController,
  listContactRequestsController,
  getContactRequestByIdController,
  updateContactRequestStatusController,
};
