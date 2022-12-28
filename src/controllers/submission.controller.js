const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { submissionService, bankService } = require('../services');

const createSubmission = catchAsync(async (req, res) => {
  const submission = await submissionService.createSubmission(req.body);
  await bankService.updateExamSubmissionById(req.body.bank, { submissions: submission._id });
  res.status(httpStatus.CREATED).send(submission);
});

const getSubmissions = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['bank', 'user']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'user, bank, subject';
  const result = await submissionService.querySubmissions(filter, options);
  res.send(result);
});

const getSubmission = catchAsync(async (req, res) => {
  const submission = await submissionService.getSubmissionById(req.params.submissionId);
  if (!submission) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Submission not found');
  }
  res.send(submission);
});

const updateSubmission = catchAsync(async (req, res) => {
  const submission = await submissionService.updateSubmissionById(req.params.submissionId, req.body);
  res.send(submission);
});

const deleteSubmission = catchAsync(async (req, res) => {
  const submission = await submissionService.deleteSubmissionById(req.params.submissionId);
  res.status(httpStatus.NO_CONTENT).send(submission);
});

module.exports = {
  createSubmission,
  getSubmissions,
  getSubmission,
  updateSubmission,
  deleteSubmission,
};
