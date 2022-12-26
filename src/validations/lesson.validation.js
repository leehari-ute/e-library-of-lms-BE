const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLesson = {
  body: Joi.object().keys({
    subject: Joi.string().required(),
    topic: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string(),
    file: Joi.array(),
    video: Joi.string(),
    user: Joi.string().required(),
    exams: Joi.array(),
  }),
};

const getLessons = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    subject: Joi.string(),
    user: Joi.string(),
    status: Joi.number(),
  }),
};

const getLesson = {
  params: Joi.object().keys({
    lessonId: Joi.string().custom(objectId),
  }),
};

const updateLesson = {
  params: Joi.object().keys({
    lessonId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      subject: Joi.string(),
      topic: Joi.string(),
      title: Joi.string(),
      description: Joi.string(),
      file: Joi.array(),
      video: Joi.string(),
      user: Joi.string(),
      status: Joi.number(),
      reasonReject: Joi.string(),
      userReject: Joi.string(),
      dateReject: Joi.date(),
      QA: Joi.array(),
      exams: Joi.array(),
    })
    .min(1),
};

const deleteLesson = {
  params: Joi.object().keys({
    lessonId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLesson,
  getLessons,
  getLesson,
  updateLesson,
  deleteLesson,
};
