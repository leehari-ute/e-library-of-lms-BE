const httpStatus = require('http-status');
const { Payment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Payment
 * @param {Object} paymentBody
 * @returns {Promise<Payment>}
 */
const createPayment = async (paymentBody) => {
  return Payment.create(paymentBody);
};

/**
 * Query for Payments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPayments = async (filter, options) => {
  const payments = await Payment.paginate(filter, options);
  return payments;
};

/**
 * Get Payment by id
 * @param {ObjectId} id
 * @returns {Promise<Payment>}
 */
const getPaymentById = async (id) => {
  return Payment.findById(id).populate('subject').populate('user');
};

/**
 * Get Payment by status
 * @param {string} status
 * @returns {Promise<Payment>}
 */
const getPaymentByStatus = async (status) => {
  return Payment.findOne({ status }).populate('subject').populate('user');
};

/**
 * Get Payment by subject
 * @param {string} subject
 * @returns {Promise<Payment>}
 */
const getPaymentBySubject = async (subject) => {
  return Payment.findOne({ subject }).populate('subject').populate('user');
};

/**
 * Get Payment by user
 * @param {string} user
 * @returns {Promise<Payment>}
 */
const getPaymentByUser = async (user) => {
  return Payment.findOne({ user }).populate('subject').populate('user');
};

/**
 * Update Payment by id
 * @param {ObjectId} paymentId
 * @param {Object} updateBody
 * @returns {Promise<Payment>}
 */
const updatePaymentById = async (paymentId, updateBody) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }

  Object.assign(payment, updateBody);
  await payment.save();
  return payment;
};

/**
 * Delete subejct by id
 * @param {ObjectId} paymentId
 * @returns {Promise<Payment>}
 */
const deletePaymentById = async (paymentId) => {
  const payment = await getPaymentById(paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  await payment.remove();
  return payment;
};

module.exports = {
  createPayment,
  queryPayments,
  getPaymentById,
  getPaymentByStatus,
  getPaymentBySubject,
  getPaymentByUser,
  updatePaymentById,
  deletePaymentById,
};
