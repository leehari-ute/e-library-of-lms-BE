const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { subjectgroupService } = require('../services');

const createSubjectgroup = catchAsync(async (req, res) => {
  const subjectgroup = await subjectgroupService.createExam(req.body);
  res.status(httpStatus.CREATED).send(subjectgroup);
});

const getSubjectgroups = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['fileName', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'subject, bank';
  const result = await subjectgroupService.queryExams(filter, options);
  res.send(result);
});

const getSubjectgroup = catchAsync(async (req, res) => {
  const subjectgroup = await subjectgroupService.getExamById(req.params.subjectgroupId);
  if (!subjectgroup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found');
  }
  res.send(subjectgroup);
});

const updateSubjectgroup = catchAsync(async (req, res) => {
  const subjectgroup = await subjectgroupService.updateExamById(req.params.subjectgroupId, req.body);
  res.send(subjectgroup);
});

const deleteSubjectgroup = catchAsync(async (req, res) => {
  const subjectgroup = await subjectgroupService.deleteExamById(req.params.subjectgroupId);
  res.status(httpStatus.NO_CONTENT).send(subjectgroup);
});

module.exports = {
  createSubjectgroup,
  getSubjectgroups,
  getSubjectgroup,
  updateSubjectgroup,
  deleteSubjectgroup,
};
