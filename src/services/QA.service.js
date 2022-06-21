const httpStatus = require('http-status');
const { QA } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a QA
 * @param {Object} QABody
 * @returns {Promise<QA>}
 */
const createQA = async (QABody) => {
  return QA.create(QABody);
};

/**
 * Query for QAs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQAs = async (filter, options) => {
  const QAs = await QA.paginate(filter, options);
  return QAs;
};

/**
 * Get QA by id
 * @param {ObjectId} id
 * @returns {Promise<QA>}
 */
const getQAById = async (id) => {
  const qa = QA.findById(id)
    .populate('user')
    .populate({ path: 'answers', populate: { path: 'user' } });
  return qa;
};

/**
 * Get QA by lesson
 * @param {string} lesson
 * @returns {Promise<QA>}
 */
const getQAByLesson = async (lesson) => {
  return QA.findOne({ lesson }).populate('user');
};

/**
 * Get QA by user
 * @param {string} user
 * @returns {Promise<QA>}
 */
const getQAByUser = async (user) => {
  return QA.findOne({ user }).populate('user');
};

/**
 * Update QA by id
 * @param {ObjectId} QAId
 * @param {Object} updateBody
 * @returns {Promise<QA>}
 */
const updateQAById = async (QAId, updateBody) => {
  const qA = await getQAById(QAId);
  if (!qA) {
    throw new ApiError(httpStatus.NOT_FOUND, 'QA not found');
  }
  if (updateBody.answers) {
    qA.answers.push(updateBody.answers[0]);
  } else if (updateBody.likes) {
    if (qA.likes.includes(updateBody.likes[0])) {
      qA.likes = qA.likes.filter((value) => value !== updateBody.likes[0]);
    } else {
      qA.likes.push(updateBody.likes[0]);
    }
  } else {
    Object.assign(qA, updateBody);
  }
  await qA.save();

  return qA;
};

/**
 * Delete qA by id
 * @param {ObjectId} QAId
 * @returns {Promise<QA>}
 */
const deleteQAById = async (QAId) => {
  const qa = await getQAById(QAId);
  if (!qa) {
    throw new ApiError(httpStatus.NOT_FOUND, 'QA not found');
  }
  await qa.remove();
  return qa;
};

module.exports = {
  createQA,
  queryQAs,
  getQAById,
  getQAByLesson,
  getQAByUser,
  updateQAById,
  deleteQAById,
};
