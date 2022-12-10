const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { timeLearningService, userService } = require('../services');

const createTimeLearning = catchAsync(async (req, res) => {
  const timeLearning = await timeLearningService.createTimeLearning(req.body);
  if (req.body.student) {
    req.body.student.forEach(async (it) => {
      await userService.updateUserByUserCode(it, { timeLearnings: timeLearning._id });
    });
  }
  res.status(httpStatus.CREATED).send(timeLearning);
});

const getTimeLearnings = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['student', 'subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate', 'sort']);
  options.populate = 'student, subject';
  options.sort = options.sort ? options.sort : 'desc';
  options.sortBy = options.sortBy ? `${options.sortBy}:${options.sort}` : 'createdAt:desc';
  const result = await timeLearningService.queryTimeLearnings(filter, options);
  res.send(result);
});

const getTimeLearning = catchAsync(async (req, res) => {
  const timeLearning = await timeLearningService.getTimeLearningById(req.params.timeLearningId);
  if (!timeLearning) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TimeLearning not found');
  }
  res.send(timeLearning);
});

const getByStudentInCurrentWeek = catchAsync(async (req, res) => {
  const timeLearning = await timeLearningService.getByStudentInCurrentWeek(req.query.student);
  if (!timeLearning) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TimeLearning not found');
  }
  res.send(timeLearning);
});

const updateTimeLearning = catchAsync(async (req, res) => {
  const timeLearning = await timeLearningService.updateTimeLearningById(req.params.timeLearningId, req.body);
  res.send(timeLearning);
});

const updateTimeLearningByStudentAndSubject = catchAsync(async (req, res) => {
  const { student, subject } = req.params;
  const timeLearning = await timeLearningService.updateTimeLearningByStudentAndSubject({ student, subject }, req.body);
  res.send(timeLearning);
});

const deleteTimeLearning = catchAsync(async (req, res) => {
  await timeLearningService.deleteTimeLearningById(req.params.timeLearningId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTimeLearning,
  getTimeLearnings,
  getTimeLearning,
  getByStudentInCurrentWeek,
  updateTimeLearning,
  updateTimeLearningByStudentAndSubject,
  deleteTimeLearning,
};
