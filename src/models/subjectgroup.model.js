const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const subjectgroupSchema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    groupCode: {
      type: String,
      required: true,
      trim: true,
    },
    bank: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bank' }],
    subject: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
subjectgroupSchema.plugin(toJSON);
subjectgroupSchema.plugin(paginate);

subjectgroupSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef SubjectGroup
 */
const SubjectGroup = mongoose.model('SubjectGroup', subjectgroupSchema);

module.exports = SubjectGroup;
