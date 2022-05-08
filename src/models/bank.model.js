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
      type: String,
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
    examType: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
      default: 15,
    },
    status: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
    },
    updatedAt: {
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
