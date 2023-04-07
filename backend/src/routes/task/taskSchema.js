const Joi = require('@hapi/joi');

exports.CreateTaskSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string(),
  slug: Joi.string(),
  author: Joi.string().hex().length(24).lowercase(),
});
exports.updateTaskSchema = Joi.object().keys({
  title: Joi.string().min(3).max(30).optional(),
  description: Joi.string(),
});
