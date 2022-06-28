const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuestion = {
  body: Joi.object().keys({
    quesCode: Joi.string(),
    quesName: Joi.string().required(),
    quesType: Joi.number(),
    answers: Joi.array(),
    examType: Joi.number().required(),
    correct: Joi.array().required(),
    correctEssay: Joi.string(),
    level: Joi.number(),
    subjectgroup: Joi.string().required(),
    subject: Joi.string().required(),
    user: Joi.string().required(),
    bank: Joi.string(),
  }),
};

const getQuestions = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    subject: Joi.string(),
    level: Joi.number(),
    subjectgroup: Joi.string(),
  }),
};

const getQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
};

const updateQuestion = {
  params: Joi.object().keys({
    questionId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      quesCode: Joi.string(),
      quesName: Joi.string(),
      quesType: Joi.number(),
      answers: Joi.array(),
      examType: Joi.number(),
      correct: Joi.array(),
      correctEssay: Joi.string(),
      level: Joi.number(),
      subjectgroup: Joi.string(),
      subject: Joi.string(),
      user: Joi.string(),
      bank: Joi.string(),
    })
    .min(1),
};

const deleteQuestion = {
  params: Joi.object().keys({
    questionId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createQuestion,
  getQuestions,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
