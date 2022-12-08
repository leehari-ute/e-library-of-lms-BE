const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const timeLearningSchema = mongoose.Schema(
  {
    subject: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' },
    student: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    time: { type: Number, default: 0 }, // milliseconds
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
timeLearningSchema.plugin(toJSON);
timeLearningSchema.plugin(paginate);

timeLearningSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef TimeLearning
 */
const TimeLearning = mongoose.model('Learning', timeLearningSchema);

module.exports = TimeLearning;
