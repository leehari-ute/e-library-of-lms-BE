const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const fileSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true,
    },
    fileRole: {
      type: Number,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
      trim: true,
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
