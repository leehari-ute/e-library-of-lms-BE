const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFile = {
  body: Joi.object().keys({
    fileName: Joi.string(),
    url: Joi.string().required(),
    user: Joi.string().required(),
    status: Joi.number(),
    lesson: Joi.string(),
    classes: Joi.array(),
    subject: Joi.string().required(),
  }),
};

const getFiles = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.number(),
    user: Joi.string(),
  }),
};

const getFile = {
  params: Joi.object().keys({
    fileId: Joi.string().custom(objectId),
  }),
};

const updateFile = {
  params: Joi.object().keys({
    fileId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      fileName: Joi.string(),
      url: Joi.string(),
      user: Joi.string(),
      status: Joi.number(),
      lesson: Joi.string(),
      classes: Joi.array(),
      subject: Joi.string(),
    })
    .min(1),
};

const deleteFile = {
  params: Joi.object().keys({
    fileId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createFile,
  getFiles,
  getFile,
  updateFile,
  deleteFile,
};
