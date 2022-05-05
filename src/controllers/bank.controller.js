const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bankService } = require('../services');

const createExam = catchAsync(async (req, res) => {
  const exam = await bankService.createExam(req.body);
  res.status(httpStatus.CREATED).send(exam);
});

const getExams = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fileName', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'subject';
  const result = await bankService.queryExams(filter, options);
  res.send(result);
});

const getExam = catchAsync(async (req, res) => {
  const exam = await bankService.getExamById(req.params.examId);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found');
  }
  res.send(exam);
});

const updateExam = catchAsync(async (req, res) => {
  const exam = await bankService.updateExamById(req.params.examId, req.body);
  res.send(exam);
});

const deleteExam = catchAsync(async (req, res) => {
  await bankService.deleteExamById(req.params.examId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createExam,
  getExams,
  getExam,
  updateExam,
  deleteExam,
};
