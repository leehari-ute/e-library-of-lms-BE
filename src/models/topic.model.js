const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const topicSchema = mongoose.Schema(
  {
    subjectId: {
      type: String,
      require: true,
    },
    classId: {
      type: Array,
      default: [],
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    lesson: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
    },
    source: {
      type: String,
    },
    content: {
      type: String,
    },
    QA: {
      type: Array,
      default: [],
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
