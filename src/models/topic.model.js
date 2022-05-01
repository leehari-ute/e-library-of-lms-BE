const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const topicSchema = mongoose.Schema(
  {
    subjectId: {
      type: String,
      require: true,
    },
    classId: Array,
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    lesson: [{ _id: mongoose.Schema.Types.ObjectId, title: String, video: String, file: String }],
    image: {
      type: String,
    },
    source: {
      type: String,
    },
    content: {
      type: String,
    },
    noti: [
      { _id: mongoose.Schema.Types.ObjectId, title: String, time: String, type: String, content: String },
      { timestamps: true },
    ],
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
topicSchema.plugin(toJSON);
topicSchema.plugin(paginate);

topicSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Topic
 */
const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
