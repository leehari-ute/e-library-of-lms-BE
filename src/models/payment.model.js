const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const paymentSchema = mongoose.Schema(
  {
    feeCode: {
      type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    status: {
      type: Number,
      default: 0,
    },
    subject: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Subject' },
    cost: { type: Number },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
paymentSchema.plugin(toJSON);
paymentSchema.plugin(paginate);

paymentSchema.pre('save', async function (next) {
  next();
});

/**
 * @typedef Payment
 */
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
