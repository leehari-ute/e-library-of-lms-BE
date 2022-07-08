const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createNoti = {
  body: Joi.object().keys({
    from: Joi.string().required(),
    to: Joi.array(),
    classes: Joi.string(),
    topic: Joi.string(),
    subject: Joi.string(),

    title: Joi.string(),
    content: Joi.string().required(),
  }),
};

const getNotis = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    subject: Joi.string(),
  }),
};

const getNoti = {
  params: Joi.object().keys({
    notiId: Joi.string().custom(objectId),
  }),
};

const updateNoti = {
  params: Joi.object().keys({
    notiId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      from: Joi.string(),
      to: Joi.array(),
      classes: Joi.string(),
      topic: Joi.string(),
      content: Joi.string(),
      title: Joi.string(),
      subject: Joi.string(),
    })
    .min(1),
};

const deleteNoti = {
  params: Joi.object().keys({
    notiId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createNoti,
  getNotis,
  getNoti,
  updateNoti,
  deleteNoti,
};
