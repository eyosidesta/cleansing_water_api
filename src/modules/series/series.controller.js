import {
  createSeries,
  deleteSeries,
  getSeriesById,
  listSeries,
  updateSeries,
} from './series.service.js';

async function listSeriesController(_req, res, next) {
  try {
    const items = await listSeries();
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
}

async function getSeriesByIdController(req, res, next) {
  try {
    const item = await getSeriesById(req.validated.params.seriesId);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

async function createSeriesController(req, res, next) {
  try {
    const item = await createSeries(req.validated.body);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
}

async function updateSeriesController(req, res, next) {
  try {
    const item = await updateSeries(req.validated.params.seriesId, req.validated.body);
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
}

async function deleteSeriesController(req, res, next) {
  try {
    const result = await deleteSeries(req.validated.params.seriesId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export {
  listSeriesController,
  getSeriesByIdController,
  createSeriesController,
  updateSeriesController,
  deleteSeriesController,
};
