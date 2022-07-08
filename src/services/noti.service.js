const httpStatus = require('http-status');
const { Noti } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a noti
 * @param {Object} notiBody
 * @returns {Promise<Noti>}
 */
const createNoti = async (notiBody) => {
  const re = /&lt;/gi;
  // eslint-disable-next-line no-param-reassign
  notiBody.content = notiBody.content.replace(re, '<');
  return Noti.create(notiBody);
};

/**
 * Query for noties
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryNoties = async (filter, options) => {
  const noties = await Noti.paginate(filter, options);
  return noties;
};

/**
 * Get noti by id
 * @param {ObjectId} id
 * @returns {Promise<Noti>}
 */
const getNotiById = async (id) => {
  return Noti.findById(id).populate('from').populate('subject').populate('to');
};

/**
 * Get Noti by subject
 * @param {string} subject
 * @returns {Promise<Noti>}
 */
const getNotiBySubject = async (subject) => {
  return Noti.findOne({ subject }).populate('from').populate('subject').populate('to');
};

/**
 * Update noti by id
 * @param {ObjectId} notiId
 * @param {Object} updateBody
 * @returns {Promise<Noti>}
 */
const updateNotiById = async (notiId, updateBody) => {
  const noties = await getNotiById(notiId);
  if (!noties) {
    throw new ApiError(httpStatus.NOT_FOUND, 'noti not found');
  }

  Object.assign(noties, updateBody);
  await noties.save();
  return noties;
};

/**
 * Delete subejct by id
 * @param {ObjectId} notiId
 * @returns {Promise<Noti>}
 */
const deleteNotiById = async (notiId) => {
  const noties = await getNotiById(notiId);
  if (!noties) {
    throw new ApiError(httpStatus.NOT_FOUND, 'noti not found');
  }
  await noties.remove();
  return noties;
};

module.exports = {
  createNoti,
  queryNoties,
  getNotiById,
  getNotiBySubject,
  updateNotiById,
  deleteNotiById,
};
