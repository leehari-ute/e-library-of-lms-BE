const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classesService, userService, subjectService } = require('../services');

const createClass = catchAsync(async (req, res) => {
  const classes = await classesService.createClass(req.body);
  if (req.body.student) {
    req.body.student.forEach(async (it) => {
      await userService.updateUserByUserCode(it, { classes: classes._id });
    });
  }
  await subjectService.updateSubjectById(req.body.subject, { classes: classes._id });
  res.status(httpStatus.CREATED).send(classes);
});

const getClasses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['teacher', 'subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'teacher, subject';
  const result = await classesService.queryClasses(filter, options);
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
