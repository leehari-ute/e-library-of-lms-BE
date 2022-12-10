const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { TimeLearning } = require('../models');
const ApiError = require('../utils/ApiError');
const getDateOfCurrentWeek = require('../utils/getAllDateOfWeek');

/**
 * Create a timeLearning
 * @param {Object} timeLearningBody
 * @returns {Promise<TimeLearning>}
 */
const createTimeLearning = async (timeLearningBody) => {
  const { student, subject } = timeLearningBody;
  const time = timeLearningBody.time || 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateString = today.toLocaleDateString();
  const timeLearning = await TimeLearning.create({
    subject,
    student,
    times: {
      hours: time,
      date: dateString,
    },
    total: time,
  });
  return TimeLearning.findById(timeLearning.id).populate('student').populate('subject');
};

/**
 * Query for timeLearnings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.populate] - Populate data fields. Hierarchy of fields should be separated by (.). Multiple populating criteria should be separated by commas (,)
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTimeLearnings = async (filter, options) => {
  const timeLearnings = await TimeLearning.paginate(filter, options);
  return timeLearnings;
};

/**
 * Get timeLearning by id
 * @param {ObjectId} id
 * @returns {Promise<TimeLearning>}
 */
const getTimeLearningById = async (id) => {
  return TimeLearning.findById(id).populate('student').populate('subject');
};

/**
 * Get timeLearning by subject
 * @param {string} subject
 * @returns {Promise<TimeLearning>}
 */
const getTimeLearningBySubject = async (subject) => {
  return TimeLearning.findOne({ subject }).populate('student').populate('subject');
};

/**
 * Get timeLearning by student
 * @param {string} student
 * @returns {Promise<TimeLearning>}
 */
const getTimeLearningByStudent = async (student) => {
  return TimeLearning.findOne({ student }).populate('student').populate('subject');
};

/**
 * Get by student in current week
 * @param {string} student
 * @returns {Promise<TimeLearning>}
 */
const getByStudentInCurrentWeek = async (student) => {
  const times = await TimeLearning.aggregate([
    {
      $match: { student: mongoose.Types.ObjectId(student) },
    },
    {
      $unwind: '$times',
    },
    {
      $group: {
        _id: {
          date: '$times.date',
        },
        hours: { $sum: '$times.hours' },
      },
    },
    {
      $sort: { hours: -1 },
    },
  ]);

  if (times.length) {
    const allDates = getDateOfCurrentWeek();
    const result = [];
    for (const [key, value] of Object.entries(allDates)) {
      const date = times.find((item) => item._id.date === value);
      if (date) {
        result.push({ day: key, time: date.hours });
      } else {
        result.push({ day: key, time: 0 });
      }
    }
    return result;
  }
  return times;
};

/**
 * update timeLearning by student & subject
 * @param {string} student
 * @param {string} subject
 * @returns {Promise<TimeLearning>}
 */

const updateTimeLearningByStudentAndSubject = async ({ student, subject }, body) => {
  let timeLearning = await TimeLearning.findOne({ student, subject });
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dateString = today.toLocaleDateString();
  if (timeLearning) {
    const isExistDate = await TimeLearning.findOneAndUpdate(
      { 'times.date': dateString },
      {
        $inc: {
          'times.$.hours': body.time,
          total: body.time,
        },
      },
      {
        new: true,
      }
    )
      .populate('student')
      .populate('subject');

    if (!isExistDate) {
      timeLearning = await TimeLearning.findOneAndUpdate(
        { student, subject },
        {
          $push: { times: { hours: body.time, date: dateString } },
          $inc: {
            total: body.time,
          },
        },
        {
          new: true,
        }
      )
        .populate('student')
        .populate('subject');
      return timeLearning;
    }
    return isExistDate;
  }
  timeLearning = await TimeLearning.create({
    student,
    subject,
    times: [{ hours: body.time, date: dateString }],
    total: body.time,
  });
  return TimeLearning.findById(timeLearning.id).populate('student').populate('subject');
};

/**
 * Update timeLearning by id
 * @param {ObjectId} timeLearningId
 * @param {Object} updateBody
 * @returns {Promise<TimeLearning>}
 */
const updateTimeLearningById = async (timeLearningId, body) => {
  const timeLearning = await TimeLearning.findOneAndUpdate({ _id: timeLearningId }, body, {
    new: true,
  })
    .populate('student')
    .populate('subject');

  return timeLearning;
};

/**
 * Delete subejct by id
 * @param {ObjectId} timeLearningId
 * @returns {Promise<TimeLearning>}
 */
const deleteTimeLearningById = async (timeLearningId) => {
  const timeLearning = await getTimeLearningById(timeLearningId);
  if (!timeLearning) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TimeLearning not found');
  }
  await timeLearning.remove();
  return timeLearning;
};

module.exports = {
  createTimeLearning,
  queryTimeLearnings,
  getTimeLearningById,
  getByStudentInCurrentWeek,
  getTimeLearningByStudent,
  getTimeLearningBySubject,
  updateTimeLearningById,
  updateTimeLearningByStudentAndSubject,
  deleteTimeLearningById,
};
