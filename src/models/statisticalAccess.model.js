const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const statisticalAccessSchema = mongoose.Schema(
  {
    total: {
      type: Number,
    },
    today: {
      type: {
        total: Number,
        date: Date,
      },
    },
    week: {
      type: Number,
    },
    month: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
statisticalAccessSchema.plugin(toJSON);

statisticalAccessSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Statistical
 */
const Statistical = mongoose.model('Statistical', statisticalAccessSchema);

module.exports = Statistical;
