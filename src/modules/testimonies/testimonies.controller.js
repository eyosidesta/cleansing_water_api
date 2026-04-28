import {
  createTestimony,
  deleteTestimony,
  getTestimonyById,
  listTestimonies,
  updateTestimony,
} from './testimonies.service.js';

async function listTestimoniesController(_req, res, next) {
  try {
    const testimonies = await listTestimonies();
    res.status(200).json(testimonies);
  } catch (error) {
    next(error);
  }
}

async function getTestimonyByIdController(req, res, next) {
  try {
    const testimony = await getTestimonyById(req.validated.params.testimonyId);
    res.status(200).json(testimony);
  } catch (error) {
    next(error);
  }
}

async function createTestimonyController(req, res, next) {
  try {
    const testimony = await createTestimony(req.validated.body, req.user.sub);
    res.status(201).json(testimony);
  } catch (error) {
    next(error);
  }
}

async function updateTestimonyController(req, res, next) {
  try {
    const testimony = await updateTestimony(req.validated.params.testimonyId, req.validated.body);
    res.status(200).json(testimony);
  } catch (error) {
    next(error);
  }
}

async function deleteTestimonyController(req, res, next) {
  try {
    const result = await deleteTestimony(req.validated.params.testimonyId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export {
  listTestimoniesController,
  getTestimonyByIdController,
  createTestimonyController,
  updateTestimonyController,
  deleteTestimonyController,
};
