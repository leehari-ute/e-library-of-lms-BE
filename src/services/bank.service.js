const httpStatus = require('http-status');
const lodash = require('lodash');
const { Bank, Question, Subject } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a bank
 * @param {Object} bankBody
 * @returns {Promise<Bank>}
 */
const createExam = async (bankBody) => {
  bankBody.status = bankBody.isFinal ? 0 : 1;
  const bank = await Bank.create(bankBody);
  if (!bank.isFinal) {
    await Subject.updateOne({ _id: bank.subject }, { $push: { bank: bank._id } });
  }
  return Bank.findById(bank.id).populate('subject').populate('user');
};

/**
 * Create a bank with exist question
 * @param {Object} body
 * @returns {Promise<Bank>}
 */
const createExamWithQuestion = async (body) => {
  body.difficultLevel = parseInt(body.difficultLevel);
  body.mediumLevel = parseInt(body.mediumLevel);
  body.easyLevel = parseInt(body.easyLevel);
  const levels = [
    {
      value: 2,
      label: 'difficult',
      list: await Question.find({ level: 2, subject: body.subject }),
    },
    {
      value: 1,
      label: 'medium',
      list: await Question.find({ level: 1, subject: body.subject }),
    },
    {
      value: 0,
      label: 'easy',
      list: await Question.find({ level: 0, subject: body.subject }),
    },
  ];
  const listQuestion = [];
  for (const element of levels) {
    const curLev = element;
    const list = [];
    for (let i = 0; i < body[`${curLev.label}Level`]; i++) {
      let ques = {};
      do {
        ques = curLev.list[Math.floor(Math.random() * curLev.list.length)];
      } while (!ques || (list.find((item) => item === ques.id) && list.length < curLev.list.length));
      if (ques && ques.id) {
        list.push(ques.id);
      }
    }
    listQuestion.push(...list);
  }
  delete body.difficultLevel;
  delete body.mediumLevel;
  delete body.easyLevel;
  body.question = listQuestion;
  body.status = body.isFinal ? 0 : 1;
  const bank = await Bank.create(body);
  if (!bank.isFinal) {
    await Subject.updateOne({ _id: bank.subject }, { $push: { bank: bank._id } });
  }
  await Question.updateMany({ _id: bank.question }, { $push: { bank: bank._id } });

  return Bank.findById(bank.id).populate('subject').populate('question').populate('user');
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
  return Bank.findById(id)
    .populate('user')
    .populate('subject')
    .populate('question')
    .populate({ path: 'submissions', populate: { path: 'user' } });
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
  const oldSubject = exam.subject;
  if (updateBody.submissions) {
    if (!lodash.isArray(updateBody.submissions)) {
      exam.submissions.push(updateBody.submissions);
    } else {
      Object.assign(exam, updateBody);
    }
  } else {
    Object.assign(exam, updateBody);
  }
  if (updateBody.subject && updateBody.subject !== oldSubject.toString()) {
    await Subject.updateOne({ _id: exam.subject }, { $push: { bank: updateBody.subject }, $pull: { bank: oldSubject } });
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
 * Update exam submission by id
 * @param {ObjectId} examId
 * @param {Object} updateBody
 * @returns {Promise<Bank>}
 */
const updateExamSubmissionById = async (examId, updateBody) => {
  const exam = await getExamById(examId);
  if (!exam) {
    throw new ApiError(httpStatus.NOT_FOUND, 'exam not found');
  }
  exam.submissions.push(updateBody.submissions);
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
  await Subject.updateOne({ _id: exam.subject }, { $pull: { bank: exam.subject } });
  return exam;
};

module.exports = {
  createExam,
  createExamWithQuestion,
  queryExams,
  getExamById,
  getExamByStatus,
  getExamBySubject,
  getExamByUser,
  updateExamById,
  updateExamQuestionById,
  updateExamSubmissionById,
  getExamBySubjectGroup,
  deleteExamById,
};
