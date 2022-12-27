const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { QAService, lessonService } = require('../services');

const createQA = catchAsync(async (req, res) => {
  const QA = await QAService.createQA(req.body);
  await lessonService.updateLessonById(req.body.lesson, { QA: QA._id });
  res.status(httpStatus.CREATED).send(QA);
});

const getQAs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['lesson', 'user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'lesson, user, subject';
  options.sortBy = 'createdAt:desc';

  const result = await QAService.queryQAs(filter, options);
  res.send(result);
});

const getQA = catchAsync(async (req, res) => {
  const QA = await QAService.getQAById(req.params.QAId);
  if (!QA) {
    throw new ApiError(httpStatus.NOT_FOUND, 'QA not found');
  }
  res.send(QA);
});

const updateQA = catchAsync(async (req, res) => {
  const QA = await QAService.updateQAById(req.params.QAId, req.body);
  res.send(QA);
});

const deleteQA = catchAsync(async (req, res) => {
  const QA = await QAService.deleteQAById(req.params.QAId);
  res.status(httpStatus.NO_CONTENT).send(QA);
});

module.exports = {
  createQA,
  getQAs,
  getQA,
  updateQA,
  deleteQA,
};
