const httpStatus = require('http-status');
const { Topic } = require('../models');

const ApiError = require('../utils/ApiError');

/**
 * Create a topic
 * @param {Object} topicBody
 * @returns {Promise<Topic>}
 */
const createTopic = async (topicBody) => {
  return Topic.create(topicBody);
};

/**
 * Query for topics
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTopics = async (filter, options) => {
  const topics = await Topic.paginate(filter, options);
  return topics;
};

/**
 * Get topic by id
 * @param {ObjectId} id
 * @returns {Promise<Topic>}
 */
const getTopicById = async (id) => {
  return Topic.findById(id).populate('subjectId');
};

/**
 * Get topic by TopicId
 * @param {string} topicId
 * @returns {Promise<Topic>}
 */
const getTopicByTopicId = async (topicId) => {
  return Topic.findOne({ topicId }).populate('subjectId');
};

/**
 * Update topic by id
 * @param {ObjectId} topicId
 * @param {Object} updateBody
 * @returns {Promise<Topic>}
 */
const updateTopicById = async (topicId, updateBody) => {
  const topic = await getTopicById(topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found');
  }

  Object.assign(topic, updateBody);
  await topic.save();
  return topic;
};

/**
 * Delete topic by id
 * @param {ObjectId} topicId
 * @returns {Promise<Topic>}
 */
const deleteTopicById = async (topicId) => {
  const topic = await getTopicById(topicId);
  if (!topic) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Topic not found');
  }
  await topic.remove();
  return topic;
};

module.exports = {
  createTopic,
  queryTopics,
  getTopicById,
  getTopicByTopicId,
  updateTopicById,
  deleteTopicById,
};
