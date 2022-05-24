const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classesService } = require('../services');

const createClass = catchAsync(async (req, res) => {
  const classes = await classesService.createClass(req.body);
  res.status(httpStatus.CREATED).send(classes);
});

const getClasses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['teacher', 'subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await classesService.queryFiles(filter, options);
  res.send(result);
});

const getClass = catchAsync(async (req, res) => {
  const classes = await classesService.getClassById(req.params.classId);
  if (!classes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  res.send(classes);
});

const updateClass = catchAsync(async (req, res) => {
  const classes = await classesService.updateClassById(req.params.classId, req.body);
  res.send(classes);
});

const deleteClass = catchAsync(async (req, res) => {
  await classesService.deleteClassById(req.params.classId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createClass,
  getClasses,
  getClass,
  updateClass,
  deleteClass,
};
