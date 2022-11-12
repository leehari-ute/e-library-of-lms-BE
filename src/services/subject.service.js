const httpStatus = require('http-status');
const lodash = require('lodash');
const { Subject, User } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a subject
 * @param {Object} subjectBody
 * @returns {Promise<Subject>}
 */
const createSubject = async (subjectBody) => {
  const subject = await Subject.create(subjectBody);
  return Subject.findById(subject.id)
    .populate({ path: 'topic', populate: { path: 'lesson' } })
    .populate('teacher')
    .populate('bank');
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
  return Subject.findById(id)
    .populate({ path: 'topic', populate: { path: 'lesson' } })
    .populate('teacher')
    .populate({ path: 'bank', populate: { path: 'submissions' } });
};

/**
 * Get subject by subCode
 * @param {string} subCode
 * @returns {Promise<Subject>}
 */
const getSubjectBySubcode = async (subCode) => {
  return Subject.findOne({ subCode }).populate('topic').populate('teacher').populate('bank');
};

/**
 * Get subject by subGroup
 * @param {string} subGroup
 * @returns {Promise<Subject>}
 */
const getSubjectBySubGroup = async (subGroup) => {
  return Subject.findOne({ subGroup }).populate('topic').populate('teacher').populate('bank');
};

/**
 * Get subject by subName
 * @param {string} subCode
 * @returns {Promise<Subject>}
 */
const getSubjectBySubname = async (subName) => {
  return Subject.findOne({ subName }).populate('topic').populate('teacher').populate('bank');
};

/**
 * Get subject by teacher
 * @param {string} teacher
 * @returns {Promise<Subject>}
 */
const getSubjectByTeacher = async (teacher) => {
  return Subject.findOne({ teacher }).populate('topic').populate('teacher').populate('bank');
};

/**
 * Update subject by id
 * @param {ObjectId} subjectId
 * @param {Object} updateBody
 * @returns {Promise<Subject>}
 */
const updateSubjectById = async (subjectId, body) => {
  const oldSubject = await getSubjectById(subjectId);
  const subject = await Subject.findOneAndUpdate({ _id: subjectId }, body, {
    new: true,
  })
    .populate({ path: 'topic', populate: { path: 'lesson' } })
    .populate('teacher')
    .populate('bank');
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  const newStudentList = subject.student;
  const oldStudentList = oldSubject.student;
  /**
   * @description  remove subject form removed user
   */
  const removedStudentList = oldStudentList.filter((e) => !newStudentList.includes(e));
  removedStudentList.forEach(async (userCode) => {
    const user = await User.findOne({ userCode });
    if (user) {
      const listSubjects = lodash.cloneDeep(user.subjects);
      lodash.remove(listSubjects, (n) => {
        return n.toString() === subject.id.toString();
      });
      user.subjects = lodash.cloneDeep(listSubjects);
      await user.save();
    }
  });
  /**
   * @description  add subject to new user
   */
  const addedStudentList = newStudentList.filter((e) => !oldStudentList.includes(e));
  addedStudentList.forEach(async (userCode) => {
    const user = await User.findOne({ userCode });
    if (user) {
      user.subjects.push(subject.id);
      await user.save();
    }
  });

  return subject;
};

/**
 * Update subject bank by id
 * @param {ObjectId} subjectId
 * @param {Object} updateBody
 * @returns {Promise<Subject>}
 */
const updateSubjectBankById = async (subjectId, updateBody) => {
  const subject = await getSubjectById(subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  subject.bank.push(updateBody.bank);
  await subject.save();
  return subject;
};

/**
 * Update subject topic by id
 * @param {ObjectId} subjectId
 * @param {Object} updateBody
 * @returns {Promise<Subject>}
 */
const updateSubjectTopicById = async (subjectId, updateBody) => {
  const subject = await getSubjectById(subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  subject.topic.push(updateBody.topic);
  await subject.save();
  return subject;
};

/**
 * Delete subject topic by id
 * @param {ObjectId} subjectId
 * @param {Object} updateBody
 * @returns {Promise<Subject>}
 */
const deleteSubjectTopicById = async (subjectId, updateBody) => {
  const subject = await getSubjectById(subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  subject.topic = subject.topic.filter((item) => item !== updateBody.topic);
  await subject.save();
  return subject;
};

/**
 * Delete subject bank by id
 * @param {ObjectId} subjectId
 * @param {Object} updateBody
 * @returns {Promise<Subject>}
 */
const deleteSubjectBankById = async (subjectId, updateBody) => {
  const subject = await getSubjectById(subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  subject.bank = subject.bank.filter((item) => item !== updateBody.bank);
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
  updateSubjectBankById,
  updateSubjectTopicById,
  deleteSubjectTopicById,
  deleteSubjectBankById,
  getSubjectBySubGroup,
  getSubjectByTeacher,
  deleteSubjectById,
};
