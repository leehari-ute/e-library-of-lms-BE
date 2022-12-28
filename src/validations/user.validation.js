const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    userName: Joi.string().required(),
    userCode: Joi.string(),
    role: Joi.string().required().valid('leadership', 'admin', 'student', 'teacher'),
  }),
};

const createUsers = {
  body: Joi.array().items(
    Joi.object().keys({
      userName: Joi.string().required(),
      userCode: Joi.string().required(),
      gender: Joi.number().valid(0, 1).required(),
      phone: Joi.string().required(),
    })
  ),
};

const getUsers = {
  query: Joi.object().keys({
    userName: Joi.string(),
    role: Joi.string(),
    userCode: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string().custom(password),
      userName: Joi.string(),
      userCode: Joi.string(),
      phone: Joi.string(),
      address: Joi.string(),
      gender: Joi.number(),
      avt: Joi.string(),
      recentSubjectId: Joi.array(),
      role: Joi.string().valid('leadership', 'student', 'teacher'),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  createUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
