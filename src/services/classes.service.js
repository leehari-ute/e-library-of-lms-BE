const httpStatus = require('http-status');
const { Classes } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a class
 * @param {Object} classBody
 * @returns {Promise<Classes>}
 */
const createClass = async (classBody) => {
  return Classes.create(classBody);
};

/**
 * Query for Classes
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryClasses = async (filter, options) => {
  const classes = await Classes.paginate(filter, options);
  return classes;
};

/**
 * Get Class by id
 * @param {ObjectId} id
 * @returns {Promise<Classes>}
 */
const getClassById = async (id) => {
  return Classes.findById(id).populate('teacher').populate('subject');
};

/**
 * Get Class by subject
 * @param {string} subject
 * @returns {Promise<Classes>}
 */
const getClassBySubject = async (subject) => {
  return Classes.findOne({ subject }).populate('teacher').populate('subject');
};

/**
 * Get class by classCode
 * @param {string} classCode
 * @returns {Promise<Classes>}
 */
const getClassByClassCode = async (classCode) => {
  return Classes.findOne({ classCode }).populate('teacher').populate('subject');
};

/**
 * Get class by teacher
 * @param {string} teacher
 * @returns {Promise<Classes>}
 */
const getClassByTeacher = async (teacher) => {
  return Classes.findOne({ teacher }).populate('teacher').populate('subject');
};

/**
 * Update class by id
 * @param {ObjectId} classId
 * @param {Object} updateBody
 * @returns {Promise<Classes>}
 */
const updateClassById = async (classId, updateBody) => {
  const classes = await getClassById(classId);
  if (!classes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'class not found');
  }

  Object.assign(classes, updateBody);
  await classes.save();
  return classes;
};

/**
 * Delete subejct by id
 * @param {ObjectId} classId
 * @returns {Promise<Classes>}
 */
const deleteClassById = async (classId) => {
  const classes = await getClassById(classId);
  if (!classes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'class not found');
  }
  await classes.remove();
  return classes;
};

module.exports = {
  createClass,
  queryClasses,
  getClassById,
  getClassBySubject,
  getClassByClassCode,
  getClassByTeacher,
  updateClassById,
  deleteClassById,
};
