const httpStatus = require('http-status');
const { Question } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Question
 * @param {Object} questionBody
 * @returns {Promise<Question>}
 */
const createQuestion = async (questionBody) => {
  const re = /&lt;/gi;
  // eslint-disable-next-line no-param-reassign
  questionBody.quesName = questionBody.quesName.replace(re, '<');
  return Question.create(questionBody);
};

/**
 * Query for Questions
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryQuestions = async (filter, options) => {
  const questions = await Question.paginate(filter, options);
  return questions;
};

/**
 * Get Question by id
 * @param {ObjectId} id
 * @returns {Promise<Question>}
 */
const getQuestionById = async (id) => {
  return Question.findById(id).populate('user');
};

/**
 * Get Question by subjectgroup
 * @param {string} subjectgroup
 * @returns {Promise<Question>}
 */
const getQuestionBySubjectgroup = async (subjectgroup) => {
  return Question.findOne({ subjectgroup }).populate('user');
};

/**
 * Get Question by level
 * @param {string} level
 * @returns {Promise<Question>}
 */
const getQuestionByLevel = async (level) => {
  return Question.findOne({ level }).populate('user');
};

/**
 * Get Question by QuestionName
 * @param {string} subject
 * @returns {Promise<Question>}
 */
const getQuestionBySubject = async (subject) => {
  return Question.findOne({ subject }).populate('user');
};

/**
 * Update Question by id
 * @param {ObjectId} questionId
 * @param {Object} updateBody
 * @returns {Promise<Question>}
 */
const updateQuestionById = async (questionId, updateBody) => {
  const question = await getQuestionById(questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }

  Object.assign(question, updateBody);
  await question.save();
  return question;
};

/**
 * Delete question by id
 * @param {ObjectId} questionId
 * @returns {Promise<Question>}
 */
const deleteQuestionById = async (questionId) => {
  const question = await getQuestionById(questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  await question.remove();
  return question;
};

module.exports = {
  createQuestion,
  queryQuestions,
  getQuestionById,
  getQuestionBySubject,
  getQuestionBySubjectgroup,
  updateQuestionById,
  getQuestionByLevel,
  deleteQuestionById,
};
