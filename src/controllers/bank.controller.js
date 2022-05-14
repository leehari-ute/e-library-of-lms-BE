const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bankService } = require('../services');
const { subjectService } = require('../services');

const createExam = catchAsync(async (req, res) => {
  const exam = await bankService.createExam(req.body);
  await subjectService.updateSubjectBankById(req.body.subject, { bank: exam._id });
  res.status(httpStatus.CREATED).send(exam);
});

const getExams = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fileName', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'subject, user, question';
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
  const exam = await bankService.deleteExamById(req.params.examId);
  await subjectService.deleteSubjectBankById(req.body.subjectId, { bank: exam._id });
  res.status(httpStatus.NO_CONTENT).send(exam);
});

module.exports = {
  createExam,
  getExams,
  getExam,
  updateExam,
  deleteExam,
};
