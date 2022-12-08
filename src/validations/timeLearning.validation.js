const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTimeLearning = {
  body: Joi.object().keys({
    student: Joi.string().required(),
    subject: Joi.string().required(),
    time: Joi.number(),
  }),
};

const getTimeLearnings = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
    student: Joi.string(),
    subject: Joi.string(),
  }),
};

const getTimeLearning = {
  params: Joi.object().keys({
    timeLearningId: Joi.string().custom(objectId),
  }),
};

const updateTimeLearning = {
  params: Joi.object().keys({
    timeLearningId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    time: Joi.number().required(),
  }),
};

const updateTimeLearningByStudentAndSubject = {
  params: Joi.object().keys({
    student: Joi.required().custom(objectId),
    subject: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      time: Joi.number(),
    })
    .min(1),
};

const deleteTimeLearning = {
  params: Joi.object().keys({
    timeLearningId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTimeLearning,
  getTimeLearnings,
  getTimeLearning,
  updateTimeLearning,
  updateTimeLearningByStudentAndSubject,
  deleteTimeLearning,
};
