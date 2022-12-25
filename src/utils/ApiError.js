const config = require('../config/config');

class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
    if (config.env === 'production') {
      this.stack = message;
    }
  }
}

module.exports = ApiError;
