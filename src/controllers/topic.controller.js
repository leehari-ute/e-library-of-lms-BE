const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { topicService } = require('../services');
const { subjectService } = require('../services');

const createTopic = catchAsync(async (req, res) => {
  const topic = await topicService.createTopic(req.body);
  await subjectService.updateSubjectTopicById(req.body.subjectId, { topic: topic._id });
  res.status(httpStatus.CREATED).send(topic);
});

const getTopics = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['subjectId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'subjectId, lesson';
  const result = await topicService.queryTopics(filter, options);
  res.send(result);
});

const getTopic = catchAsync(async (req, res) => {
  const topic = await topicService.getTopicById(req.params.topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'topic not found');
  }
  res.send(topic);
});

const updateTopic = catchAsync(async (req, res) => {
  const topic = await topicService.updateTopicById(req.params.topicId, req.body);
  res.send(topic);
});

const deleteTopic = catchAsync(async (req, res) => {
  const topic = await topicService.deleteTopicById(req.params.topicId);
  await subjectService.deleteSubjectTopicById(req.body.subjectId, { topic: topic._id });
  res.status(httpStatus.NO_CONTENT).send(topic);
});

module.exports = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
};
