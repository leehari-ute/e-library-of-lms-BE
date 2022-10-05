const httpStatus = require('http-status');
const { Statistical } = require('../models');
const ApiError = require('../utils/ApiError');

const create = async (body) => {
  return Statistical.create(body);
};

const get = async () => {
  const statistical = await Statistical.find();
  if (!statistical) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statistical not found');
  }
  return statistical;
};

const update = async (body) => {
  const statistical = await Statistical.findOneAndUpdate({ _id: body.id }, body, {
    new: true,
  });
  if (!statistical) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Statistical not found');
  }
  return statistical;
};

module.exports = {
  create,
  get,
  update,
};
