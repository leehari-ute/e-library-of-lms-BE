const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createSubjectGroup = {
  body: Joi.object().keys({
    groupCode: Joi.string().required(),
    groupName: Joi.string().required(),
    bank: Joi.array(),
    subject: Joi.array(),
  }),
};

const getSubjectGroups = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    populate: Joi.string(),
    subject: Joi.string(),
  }),
};

const getSubjectGroup = {
  params: Joi.object().keys({
    subjectgroupId: Joi.string().custom(objectId),
  }),
};

const updateSubjectGroup = {
  params: Joi.object().keys({
    subjectgroupId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      groupCode: Joi.string(),
      groupName: Joi.string(),
      subject: Joi.array(),
      bank: Joi.array(),
    })
    .min(1),
};

const deleteSubjectGroup = {
  params: Joi.object().keys({
    subjectgroupId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createSubjectGroup,
  getSubjectGroups,
  getSubjectGroup,
  updateSubjectGroup,
  deleteSubjectGroup,
};
