const httpStatus = require('http-status');
const { TimeLearning } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a timeLearning
 * @param {Object} timeLearningBody
 * @returns {Promise<TimeLearning>}
 */
const createTimeLearning = async (timeLearningBody) => {
  const timeLearning = await TimeLearning.create(timeLearningBody);
  return TimeLearning.findById(timeLearning.id).populate('student').populate('subject');
};

/**
 * Query for timeLearnings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTimeLearnings = async (filter, options) => {
  const timeLearnings = await TimeLearning.paginate(filter, options);
  return timeLearnings;
};

/**
 * Get timeLearning by id
 * @param {ObjectId} id
 * @returns {Promise<TimeLearning>}
 */
const getTimeLearningById = async (id) => {
  return TimeLearning.findById(id).populate('student').populate('subject');
};

/**
 * Get timeLearning by subject
 * @param {string} subject
 * @returns {Promise<TimeLearning>}
 */
const getTimeLearningBySubject = async (subject) => {
  return TimeLearning.findOne({ subject }).populate('student').populate('subject');
};

/**
 * Get timeLearning by student
 * @param {string} student
 * @returns {Promise<TimeLearning>}
 */
const getTimeLearningByStudent = async (student) => {
  return TimeLearning.findOne({ student }).populate('student').populate('subject');
};

/**
 * Get timeLearning by student & subject
 * @param {string} student
 * @param {string} subject
 * @returns {Promise<TimeLearning>}
 */
const updateTimeLearningByStudentAndSubject = async ({ student, subject }, body) => {
  let timeLearning = await TimeLearning.findOne({ student, subject });
  if (timeLearning) {
    timeLearning = await TimeLearning.findOneAndUpdate({ student, subject }, body, {
      new: true,
    })
      .populate('student')
      .populate('subject');
    return timeLearning;
  }
  timeLearning = await TimeLearning.create({ student, subject, time: body.time });
  return TimeLearning.findById(timeLearning.id).populate('student').populate('subject');
};

/**
 * Update timeLearning by id
 * @param {ObjectId} timeLearningId
 * @param {Object} updateBody
 * @returns {Promise<TimeLearning>}
 */
const updateTimeLearningById = async (timeLearningId, body) => {
  const timeLearning = await TimeLearning.findOneAndUpdate({ _id: timeLearningId }, body, {
    new: true,
  })
    .populate('student')
    .populate('subject');

  return timeLearning;
};

/**
 * Delete subejct by id
 * @param {ObjectId} timeLearningId
 * @returns {Promise<TimeLearning>}
 */
const deleteTimeLearningById = async (timeLearningId) => {
  const timeLearning = await getTimeLearningById(timeLearningId);
  if (!timeLearning) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TimeLearning not found');
  }
  await timeLearning.remove();
  return timeLearning;
};

module.exports = {
  createTimeLearning,
  queryTimeLearnings,
  getTimeLearningById,
  getTimeLearningByStudent,
  getTimeLearningBySubject,
  updateTimeLearningById,
  updateTimeLearningByStudentAndSubject,
  deleteTimeLearningById,
};
