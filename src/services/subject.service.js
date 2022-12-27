const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const { Subject, User, SubjectGroup } = require('../models');
const ApiError = require('../utils/ApiError');
const difference = require('../utils/different');

/**
 * Create a subject
 * @param {Object} subjectBody
 * @returns {Promise<Subject>}
 */
const createSubject = async (subjectBody) => {
  const isExist = await Subject.find({ subCode: subjectBody.subCode });
  if (isExist) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Mã môn học đã tồn tại');
  }
  const subject = await Subject.create(subjectBody);
  await User.updateMany({ _id: subject.students }, { $push: { subjects: subject._id } });
  return Subject.findById(subject.id)
    .populate({ path: 'topic', populate: { path: 'lesson' } })
    .populate('teacher')
    .populate('bank')
    .populate('subGroup')
    .populate('students');
};

/**
 * Create a subject by file
 * @param {Object} subjectBody
 * @returns {Promise<Subject>}
 */
const createSubjectByFile = async (subjectBody) => {
  try {
    const result = [];
    await Promise.all(
      subjectBody.map(async (ele, index) => {
        const isExist = await Subject.findOne({ subCode: ele.subCode });
        if (isExist) {
          let mes = `Mã môn học đã tồn tại: ${ele.subCode}`;
          if (config.env === 'development') {
            mes = `Mã môn học đã tồn tại: ${ele.subCode} & ${index}`;
          }
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, mes);
        }
        const body = ele;
        const subGroup = await SubjectGroup.findOne({ groupName: ele.subGroup });
        if (subGroup) {
          body.subGroup = subGroup.id;
        } else {
          let mes = `Không tìm thấy tổ bộ môn ${ele.subGroup}`;
          if (config.env === 'development') {
            mes = `Không tìm thấy tổ bộ môn ${ele.subGroup} & ${index}`;
          }
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, mes);
        }
        const teacher = await User.findOne({ userCode: ele.teacher });
        if (teacher) {
          body.teacher = teacher.id;
        } else {
          let mes = `Không tìm thấy giảng viên: ${ele.teacher}`;
          if (config.env === 'development') {
            mes = `Không tìm thấy giảng viên: ${ele.teacher} & ${index}`;
          }
          throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, mes);
        }
        const students = [];
        await Promise.all(
          ele.students.map(async (item) => {
            const student = await User.findOne({ userCode: item });
            if (student) {
              students.push(student.id);
            }
          })
        );
        body.students = students;
        const subject = await Subject.create(ele);
        await User.updateMany({ _id: subject.students }, { $push: { subjects: subject._id } });
        await SubjectGroup.updateOne({ _id: subject.subGroup }, { $push: { subject: subject._id } });
        const sub = await Subject.findById(subject.id)
          .populate({ path: 'topic', populate: { path: 'lesson' } })
          .populate('teacher')
          .populate('bank')
          .populate('subGroup')
          .populate('students');
        result.push(sub);
      })
    );
    return result;
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
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
    .populate({ path: 'bank', populate: { path: 'submissions' } })
    .populate('students');
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
 * @param {string} subName
 * @returns {Promise<Subject>}
 */
const getSubjectBySubname = async (subName) => {
  return Subject.findOne({ subName }).populate('topic').populate('teacher').populate('bank');
};

/**
 * Get subject by year
 * @param {string} year
 * @returns {Promise<Subject>}
 */
const getSubjectByYear = async (year) => {
  return Subject.findOne({ year }).populate('topic').populate('teacher').populate('bank');
};

/**
 * Get subject by semester
 * @param {string} semester
 * @returns {Promise<Subject>}
 */
const getSubjectBySemester = async (semester) => {
  return Subject.findOne({ semester }).populate('topic').populate('teacher').populate('bank');
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
  const oldSubject = await Subject.findById(subjectId);
  const newSubject = await Subject.findOneAndUpdate({ _id: subjectId }, body, {
    new: true,
  })
    .populate({ path: 'topic', populate: { path: 'lesson' } })
    .populate('teacher')
    .populate('bank')
    .populate('subGroup')
    .populate('students');

  const newStudentList = body.students;
  const oldStudentList = oldSubject.students;

  /**
   * @description  remove subject form removed students && add subject to new student
   */
  const added = difference(newStudentList, oldStudentList);
  if (added.length) {
    await User.updateMany({ _id: added }, { $push: { subjects: newSubject._id } });
  }
  const removed = difference(oldStudentList, newStudentList);
  if (removed.length) {
    await User.updateMany({ _id: removed }, { $pull: { subjects: newSubject._id } });
  }

  return newSubject;
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
  await User.updateMany({ _id: subject.students }, { $pull: { subjects: subject._id } });
  await SubjectGroup.updateOne({ _id: subject.subGroup }, { $pull: { subject: subject._id } });
  return subject;
};

module.exports = {
  createSubject,
  createSubjectByFile,
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
  getSubjectBySemester,
  getSubjectByYear,
  deleteSubjectById,
};
