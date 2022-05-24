const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createClasses = {
  body: Joi.object().keys({
    classCode: Joi.string().required(),
    className: Joi.string().required(),
    subject: Joi.string().required(),
    teacher: Joi.string().required(),
    student: Joi.array().required(),
  }),
};

const getClasses = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
    classCode: Joi.string(),
    subject: Joi.string(),
    teacher: Joi.string(),
  }),
};

const getClass = {
  params: Joi.object().keys({
    classesId: Joi.string().custom(objectId),
  }),
};

const updateClasses = {
  params: Joi.object().keys({
    classesId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      classCode: Joi.string(),
      className: Joi.string(),
      subject: Joi.string(),
      teacher: Joi.string(),
      student: Joi.array(),
    })
    .min(1),
};

const deleteClasses = {
  params: Joi.object().keys({
    classesId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createClasses,
  getClass,
  getClasses,
  updateClasses,
  deleteClasses,
};
