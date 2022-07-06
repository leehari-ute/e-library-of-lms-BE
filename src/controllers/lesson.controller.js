const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { lessonService, topicService } = require('../services');

const createLesson = catchAsync(async (req, res) => {
  const lesson = await lessonService.createLesson(req.body);
  await topicService.updateTopicById(req.body.topic, { lesson: lesson._id });
  res.status(httpStatus.CREATED).send(lesson);
});

const getLessons = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['subject', 'user', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'subject, user';
  options.sortBy = 'createdAt:desc';

  const result = await lessonService.queryLessons(filter, options);
  res.send(result);
});

const getLesson = catchAsync(async (req, res) => {
  const lesson = await lessonService.getLessonById(req.params.lessonId);
  if (!lesson) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lesson not found');
  }
  res.send(lesson);
});

const updateLesson = catchAsync(async (req, res) => {
  const lesson = await lessonService.updateLessonById(req.params.lessonId, req.body);
  res.send(lesson);
});

const deleteLesson = catchAsync(async (req, res) => {
  const lesson = await lessonService.deleteLessonById(req.params.lessonId);
  await topicService.deleteTopicLessonById(lesson.topic, { lesson: lesson._id });
  res.status(httpStatus.NO_CONTENT).send(lesson);
});

module.exports = {
  createLesson,
  getLessons,
  getLesson,
  updateLesson,
  deleteLesson,
};
