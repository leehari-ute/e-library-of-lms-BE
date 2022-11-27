const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createPayment = {
  body: Joi.object().keys({
    feeCode: Joi.string().required(),
    user: Joi.string().required(),
    status: Joi.number(),
    cost: Joi.number().required(),
    subject: Joi.string().required(),
  }),
};

const getPayments = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    status: Joi.number(),
    user: Joi.string(),
    subject: Joi.string(),
  }),
};

const getPayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId),
  }),
};

const updatePayment = {
  params: Joi.object().keys({
    paymentId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      feeCode: Joi.string(),
      user: Joi.string(),
      status: Joi.number(),
      cost: Joi.number(),
      subject: Joi.string(),
    })
    .min(1),
};

const deletePayment = {
  params: Joi.object().keys({
    paymentId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
};
