const httpStatus = require('http-status');
const { Bank } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a bank
 * @param {Object} bankBody
 * @returns {Promise<Bank>}
 */
const createExam = async (bankBody) => {
  return Bank.create(bankBody);
};

/**
 * Query for Banks
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryExams = async (filter, options) => {
  const banks = await Bank.paginate(filter, options);
  return banks;
};

/**
 * Get Exam by id
 * @param {ObjectId} id
 * @returns {Promise<Bank>}
 */
const getExamById = async (id) => {
  return Bank.findById(id).populate('user').populate('subject').populate('question');
};

/**
 * Get Exam by user
 * @param {string} user
 * @returns {Promise<Bank>}
 */
const getExamByUser = async (user) => {
  return Bank.findOne({ user }).populate('user').populate('subject').populate('question');
};

/**
 * Get Exam by subjectGroup
 * @param {string} subjectGroup
 * @returns {Promise<Bank>}
 */
const getExamBySubjectGroup = async (subjectGroup) => {
  return Bank.findOne({ subjectGroup }).populate('user').populate('subject').populate('question');
};

/**
 * Get Exam by status
 * @param {string} status
 * @returns {Promise<Bank>}
 */
const getExamByStatus = async (status) => {
  return Bank.findOne({ status }).populate('user').populate('subject').populate('question');
};

/**
 * Get Exam by Subject
 * @param {string} subject
 * @returns {Promise<Bank>}
 */
const getExamBySubject = async (subject) => {
  return Bank.findOne({ subject }).populate('user').populate('subject').populate('question');
};

/**
 * Update Exam by id
 * @param {ObjectId} examId
 * @param {Object} updateBody
 * @returns {Promise<Bank>}
 */
const updateExamById = async (examId, updateBody) => {
  const exam = await getExamById(examId);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Exam not found');
  }
  if (updateBody.submissions) {
    exam.submissions.push(updateBody.submissions);
  } else {
    Object.assign(exam, updateBody);
  }
  await exam.save();
  return exam;
};

/**
 * Update exam question by id
 * @param {ObjectId} examId
 * @param {Object} updateBody
 * @returns {Promise<Bank>}
 */
const updateExamQuestionById = async (examId, updateBody) => {
  const exam = await getExamById(examId);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'exam not found');
  }
  exam.question.push(updateBody.question);
  await exam.save();
  return exam;
};

/**
 * Delete subejct by id
 * @param {ObjectId} examId
 * @returns {Promise<Bank>}
 */
const deleteExamById = async (examId) => {
  const exam = await getExamById(examId);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'exam not found');
  }
  await exam.remove();
  return exam;
};

module.exports = {
  createExam,
  queryExams,
  getExamById,
  getExamByStatus,
  getExamBySubject,
  getExamByUser,
  updateExamById,
  updateExamQuestionById,
  getExamBySubjectGroup,
  deleteExamById,
};
