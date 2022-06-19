const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const lessonSchema = mongoose.Schema(
  {
    subject: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' },
    topic: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Topic' },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    file: { type: Array },
    video: { type: String, required: true },
    classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classes' }],
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    status: { type: Number, default: 0 },
    reasonReject: { type: String },
    userReject: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    dateReject: { type: Date },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
lessonSchema.plugin(toJSON);
lessonSchema.plugin(paginate);

lessonSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Lesson
 */
const Lesson = mongoose.model('Lesson', lessonSchema);

module.exports = Lesson;
