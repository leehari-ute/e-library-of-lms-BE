const mongoose = require('mongoose');

const { toJSON, paginate } = require('./plugins');

const QASchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    answers: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: { type: String },
      },
    ],
    likes: {
      type: Array,
      required: true,
    },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
QASchema.plugin(toJSON);
QASchema.plugin(paginate);

QASchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef QA
 */
const QA = mongoose.model('QA', QASchema);

module.exports = QA;
