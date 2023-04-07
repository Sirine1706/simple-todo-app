const Joi = require('@hapi/joi');
const { Types } = require('mongoose');
const AppError = require('../utils/AppError');

const middleware =
  (schema, source = 'body') =>
  (req, res, next) => {
    try {
      const { error } = schema.validate(req[source]);
      if (!error) {
        return next();
      }
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ''))
        .join(',');
      next(new AppError(message));
    } catch (error) {
      next(error);
    }
  };

exports.JoiObjectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) return helpers.error('any.invalid');
    return value;
  }, 'Object Id Validation');

module.exports = middleware;
