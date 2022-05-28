const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id).populate('recentSubject').populate('classes');
};

/**
 * Get user by userCode
 * @param {ObjectId} userCode
 * @returns {Promise<User>}
 */
const getUserByUserCode = async (userCode) => {
  return User.findOne({ userCode }).populate('recentSubject').populate('classes');
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email }).populate('recentSubject').populate('classes');
};

/**
 * Update user recentSubject by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserRecentSubjectById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  user.recentSubject = updateBody.recentSubjectId;
  await user.save();
  return user;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  if (updateBody.recentSubjectId) {
    user.recentSubject = updateBody.recentSubjectId;
    Object.assign(user, updateBody);
  } else {
    Object.assign(user, updateBody);
  }
  await user.save();
  return user;
};

/**
 * Update user by userCode
 * @param {ObjectId} userCode
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserByUserCode = async (userCode, updateBody) => {
  const user = await getUserByUserCode(userCode);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.classes) {
    user.classes.push(updateBody.classes);
  } else {
    Object.assign(user, updateBody);
  }
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByUserCode,
  getUserByEmail,
  updateUserById,
  updateUserByUserCode,
  updateUserRecentSubjectById,
  deleteUserById,
};
