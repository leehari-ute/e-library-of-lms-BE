const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTopic = {
  body: Joi.object().keys({
    subjectId: Joi.string().required(),
    title: Joi.string().required(),
  }),
};

const getTopics = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    subjectId: Joi.string(),
  }),
};

const getTopic = {
  params: Joi.object().keys({
    topicId: Joi.string().custom(objectId),
  }),
};

const updateTopic = {
  params: Joi.object().keys({
    topicId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
      description: Joi.string(),
      classId: Joi.array(),
      image: Joi.string(),
      source: Joi.array(),
      lesson: Joi.array(),
    })
    .min(1),
};

const deleteTopic = {
  params: Joi.object().keys({
    topicId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    subjectId: Joi.string().required(),
  }),
};

module.exports = {
  createTopic,
  getTopics,
  getTopic,
  updateTopic,
  deleteTopic,
};
