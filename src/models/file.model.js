const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fileSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    lesson: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Lesson' },
    status: {
      type: Number,
      default: 0,
    },
    subject: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' },
    reasonReject: { type: String },
    userReject: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dateReject: { type: Date },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
fileSchema.plugin(toJSON);
fileSchema.plugin(paginate);

fileSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef File
 */
const File = mongoose.model('File', fileSchema);

module.exports = File;
