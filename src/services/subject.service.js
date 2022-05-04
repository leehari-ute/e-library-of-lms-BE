const httpStatus = require('http-status');
const { Subject } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a subject
 * @param {Object} subjectBody
 * @returns {Promise<Subject>}
 */
const createSubject = async (subjectBody) => {
  return Subject.create(subjectBody);
};

/**
 * Query for subjects
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySubjects = async (filter, options) => {
  const subjects = await Subject.paginate(filter, options);

  return subjects;
};

/**
 * Get subject by id
 * @param {ObjectId} id
 * @returns {Promise<Subject>}
 */
const getSubjectById = async (id) => {
  return Subject.findById(id).populate('topic');
};

/**
 * Get subject by subCode
 * @param {string} subCode
 * @returns {Promise<Subject>}
 */
const getSubjectBySubcode = async (subCode) => {
  return Subject.findOne({ subCode }).populate('topic');
};

/**
 * Get subject by subName
 * @param {string} subCode
 * @returns {Promise<Subject>}
 */
const getSubjectBySubname = async (subName) => {
  return Subject.findOne({ subName }).populate('topic');
};

/**
 * Update subject by id
 * @param {ObjectId} subjectId
 * @param {Object} updateBody
 * @returns {Promise<Subject>}
 */
const updateSubjectById = async (subjectId, updateBody) => {
  const subject = await getSubjectById(subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }

  Object.assign(subject, updateBody);
  await subject.save();
  return subject;
};

/**
 * Delete subejct by id
 * @param {ObjectId} subjectId
 * @returns {Promise<Subject>}
 */
const deleteSubjectById = async (subjectId) => {
  const subject = await getSubjectById(subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  await subject.remove();
  return subject;
};

module.exports = {
  createSubject,
  querySubjects,
  getSubjectById,
  getSubjectBySubcode,
  getSubjectBySubname,
  updateSubjectById,
  deleteSubjectById,
};
