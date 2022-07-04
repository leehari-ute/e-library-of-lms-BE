const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const topicSchema = mongoose.Schema(
  {
    subjectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },

    title: {
      type: String,
      require: true,
    },

    lesson: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
    image: {
      type: String,
      default: '',
    },

    content: {
      type: String,
      default: '',
    },

    noti: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
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
