const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createFile = {
  body: Joi.object().keys({
    fileName: Joi.string().required(),
    fileRole: Joi.number().required(),
    teacher: Joi.string().required(),
    status: Joi.number(),
  }),
};

const getFiles = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.number(),
    fileName: Joi.string(),
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
      fileRole: Joi.number(),
      teacher: Joi.string(),
      status: Joi.number(),
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
