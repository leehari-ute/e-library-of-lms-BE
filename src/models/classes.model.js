const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const classesSchema = mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim: true,
    },
    classCode: {
      type: String,
      required: true,
      trim: true,
    },
    subject: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' },
    teacher: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    student: [{ type: String, required: true }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
classesSchema.plugin(toJSON);
classesSchema.plugin(paginate);

classesSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Classes
 */
const Classes = mongoose.model('Classes', classesSchema);

module.exports = Classes;
