const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQA = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    lesson: Joi.string().required(),
    subject: Joi.string().required(),

    user: Joi.string().required(),
  }),
};

const getQAs = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    lesson: Joi.string(),
    user: Joi.number(),
    subject: Joi.string(),
  }),
};

const getQA = {
  params: Joi.object().keys({
    QAId: Joi.string().custom(objectId),
  }),
};

const updateQA = {
  params: Joi.object().keys({
    QAId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
      lesson: Joi.string(),
      user: Joi.string(),
      answers: Joi.array(),
      likes: Joi.array(),
    })
    .min(1),
};

const deleteQA = {
  params: Joi.object().keys({
    QAId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createQA,
  getQAs,
  getQA,
  updateQA,
  deleteQA,
};
