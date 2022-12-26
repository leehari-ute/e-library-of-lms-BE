const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createExam = {
  body: Joi.object().keys({
    fileType: Joi.number().required(),
    isFinal: Joi.boolean(),
    examName: Joi.string().required(),
    subject: Joi.string().required(),
    time: Joi.number().required(),
    user: Joi.string().required(),
    status: Joi.number(),
    questions: Joi.array().required(),
    subjectGroup: Joi.string().required(),
  }),
};

const createExamWithQuestion = {
  body: Joi.object().keys({
    fileType: Joi.number(),
    isFinal: Joi.boolean(),
    examName: Joi.string().required(),
    subject: Joi.string().required(),
    time: Joi.number().required(),
    user: Joi.string().required(),
    status: Joi.number(),
    difficultLevel: Joi.string().required(),
    mediumLevel: Joi.string().required(),
    easyLevel: Joi.string().required(),
  }),
};

const getExams = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.number(),
    subject: Joi.string(),
    user: Joi.string(),
    subjectGroup: Joi.string(),
  }),
};

const getExam = {
  params: Joi.object().keys({
    examId: Joi.string().custom(objectId),
  }),
};

const updateExam = {
  params: Joi.object().keys({
    examId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      fileType: Joi.number(),
      examName: Joi.string(),
      subject: Joi.string(),
      time: Joi.number(),
      user: Joi.string(),
      status: Joi.number(),
      questions: Joi.object(),
      subjectGroup: Joi.string(),
      releaseTime: Joi.date(),
      isFinal: Joi.boolean(),
      submissions: Joi.any(),
    })
    .min(1),
};

const deleteExam = {
  params: Joi.object().keys({
    examId: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    subjectId: Joi.string(),
  }),
};

module.exports = {
  createExam,
  createExamWithQuestion,
  getExam,
  getExams,
  updateExam,
  deleteExam,
};
