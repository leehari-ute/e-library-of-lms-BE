const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bankSchema = mongoose.Schema(
  {
    fileType: {
      type: Number,
      default: 0,
      required: false,
    },
    examName: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Subject',
    },
    subjectGroup: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'SubjectGroup',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    question: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question', // createExamWithQuestion
      },
    ],
    questions: [
      {
        quesName: String,
        answers: Array,
        correct: Array,
        level: Number,
        quesType: Number,
        examType: Number,
        correctEssay: String,
      },
    ],
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
      },
    ],
    time: {
      type: Number,
      required: true,
      default: 15,
    },
    status: {
      type: Number,
      default: 0,
    },
    releaseTime: {
      type: Date,
    },
    isFinal: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
bankSchema.plugin(toJSON);
bankSchema.plugin(paginate);

bankSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Bank
 */
const Bank = mongoose.model('Bank', bankSchema);

module.exports = Bank;
