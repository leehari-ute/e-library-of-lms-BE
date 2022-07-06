const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { notiService, topicService } = require('../services');

const createNoti = catchAsync(async (req, res) => {
  const noties = await notiService.createNoti(req.body);
  await topicService.updateTopicById(req.body.topic, { noti: noties._id });
  res.status(httpStatus.CREATED).send(noties);
});

const getNoties = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['to', 'subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page', 'populate']);
  options.populate = 'from, to';
  options.sortBy = 'createdAt:desc';

  const result = await notiService.queryNoties(filter, options);
  res.send(result);
});

const getNoti = catchAsync(async (req, res) => {
  const noties = await notiService.getNotiById(req.params.notiId);
  if (!noties) {
    throw new ApiError(httpStatus.NOT_FOUND, 'noti not found');
  }
  res.send(noties);
});

const updateNoti = catchAsync(async (req, res) => {
  const noties = await notiService.updateNotiById(req.params.notiId, req.body);
  res.send(noties);
});

const deleteNoti = catchAsync(async (req, res) => {
  await notiService.deleteNotiById(req.params.notiId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createNoti,
  getNoties,
  getNoti,
  updateNoti,
  deleteNoti,
};
