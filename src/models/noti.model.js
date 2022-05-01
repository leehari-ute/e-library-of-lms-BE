const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const notiSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    type: {
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
notiSchema.plugin(toJSON);
notiSchema.plugin(paginate);

notiSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Noti
 */
const Noti = mongoose.model('Notification', notiSchema);

module.exports = Noti;
