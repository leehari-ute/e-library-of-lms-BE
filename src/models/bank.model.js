const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bankSchema = mongoose.Schema(
  {
    fileType: {
      type: Number,
      required: true,
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
      required: true,
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
        ref: 'Question',
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
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        submit: [{ id: String, ans: Array || String, correct: Array || String }],
        score: Number,
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
