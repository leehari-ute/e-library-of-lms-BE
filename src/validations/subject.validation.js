const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSubject = {
  body: Joi.object().keys({
    subCode: Joi.string().required(),
    subName: Joi.string().required(),
    teacher: Joi.string().required(),
    file: Joi.number(),
    status: Joi.number(),
    image: Joi.string(),
  }),
};

const getSubjects = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    subCode: Joi.string(),
    subName: Joi.string(),
  }),
};

const getSubject = {
  params: Joi.object().keys({
    subjectId: Joi.string().custom(objectId),
  }),
};

const updateSubject = {
  params: Joi.object().keys({
    subjectId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      subCode: Joi.string(),
      subName: Joi.string(),
      teacher: Joi.string(),
      status: Joi.number(),
      image: Joi.string(),
      file: Joi.number(),
    })
    .min(1),
};

const deleteSubject = {
  params: Joi.object().keys({
    subjectId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSubject,
  getSubjects,
  getSubject,
  updateSubject,
  deleteSubject,
};
