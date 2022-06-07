const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const topicSchema = mongoose.Schema(
  {
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
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
      default: '',
    },
    lesson: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    image: {
      type: String,
      default: '',
    },
    source: {
      type: Array,
      default: [],
    },
    content: {
      type: String,
      default: '',
    },
    QA: {
      type: Array,
      default: [],
    },
    noti: {
      type: Array,
      default: [],
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
