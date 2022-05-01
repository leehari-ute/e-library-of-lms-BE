const httpStatus = require('http-status');
const { File } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a file
 * @param {Object} fileBody
 * @returns {Promise<File>}
 */
const createFile = async (fileBody) => {
  return File.create(fileBody);
};

/**
 * Query for Files
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryFiles = async (filter, options) => {
  const files = await File.paginate(filter, options);
  return files;
};

/**
 * Get File by id
 * @param {ObjectId} id
 * @returns {Promise<File>}
 */
const getFileById = async (id) => {
  return File.findById(id);
};

/**
 * Get File by status
 * @param {string} status
 * @returns {Promise<File>}
 */
const getFileByStatus = async (status) => {
  return File.findOne({ status });
};

/**
 * Get File by fileName
 * @param {string} fileName
 * @returns {Promise<File>}
 */
const getFileByFilename = async (fileName) => {
  return File.findOne({ fileName });
};

/**
 * Update File by id
 * @param {ObjectId} fileId
 * @param {Object} updateBody
 * @returns {Promise<File>}
 */
const updateFileById = async (fileId, updateBody) => {
  const file = await getFileById(fileId);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }

  Object.assign(file, updateBody);
  await file.save();
  return file;
};

/**
 * Delete subejct by id
 * @param {ObjectId} FileId
 * @returns {Promise<File>}
 */
const deleteFileById = async (fileId) => {
  const file = await getFileById(fileId);
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File not found');
  }
  await file.remove();
  return file;
};

module.exports = {
  createFile,
  queryFiles,
  getFileById,
  getFileByStatus,
  getFileByFilename,
  updateFileById,
  deleteFileById,
};
