const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSubmission = {
  body: Joi.object().keys({
    user: Joi.string().required(),
    bank: Joi.string().required(),
    score: Joi.number(),
    correctNum: Joi.number(),
    submit: Joi.array(),
  }),
};

const getSubmissions = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    bank: Joi.string(),
    user: Joi.string(),
  }),
};

const getSubmission = {
  params: Joi.object().keys({
    submissionId: Joi.string().custom(objectId),
  }),
};

const updateSubmission = {
  params: Joi.object().keys({
    submissionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      user: Joi.string(),
      bank: Joi.string(),
      score: Joi.number(),
      correctNum: Joi.number(),
      submit: Joi.array(),
    })
    .min(1),
};

const deleteSubmission = {
  params: Joi.object().keys({
    submissionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSubmission,
  getSubmissions,
  getSubmission,
  updateSubmission,
  deleteSubmission,
};
