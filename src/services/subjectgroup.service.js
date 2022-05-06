const httpStatus = require('http-status');
const { SubjectGroup } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a subjectgroup
 * @param {Object} subjectgroupBody
 * @returns {Promise<SubjectGroup>}
 */
const createSubjectGroup = async (subjectgroupBody) => {
  return SubjectGroup.create(subjectgroupBody);
};

/**
 * Query for SubjectGroups
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySubjectGroups = async (filter, options) => {
  const subjectsroups = await SubjectGroup.paginate(filter, options);
  return subjectsroups;
};

/**
 * Get SubjectGroup by id
 * @param {ObjectId} id
 * @returns {Promise<SubjectGroup>}
 */
const getSubjectGroupById = async (id) => {
  return SubjectGroup.findById(id);
};

/**
 * Update SubjectGroup by id
 * @param {ObjectId} subjectgroupId
 * @param {Object} updateBody
 * @returns {Promise<SubjectGroup>}
 */
const updateSubjectGroupById = async (subjectgroupId, updateBody) => {
  const subjectgroup = await getSubjectGroupById(subjectgroupId);
  if (!subjectgroup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubjectGroup not found');
  }

  Object.assign(subjectgroup, updateBody);
  await subjectgroup.save();
  return subjectgroup;
};

/**
 * Delete subejct by id
 * @param {ObjectId} subjectgroupId
 * @returns {Promise<SubjectGroup>}
 */
const deleteSubjectGroupById = async (subjectgroupId) => {
  const subjectgroup = await getSubjectGroupById(subjectgroupId);
  if (!subjectgroup) {
    throw new ApiError(httpStatus.NOT_FOUND, 'SubjectGroup not found');
  }
  await subjectgroup.remove();
  return subjectgroup;
};

module.exports = {
  createSubjectGroup,
  querySubjectGroups,
  getSubjectGroupById,
  updateSubjectGroupById,
  deleteSubjectGroupById,
};
