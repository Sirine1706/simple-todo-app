const Joi = require('joi');

exports.CreateUserSchema = Joi.object({
  name: Joi.string().min(4).max(20),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'tn'] },
    })
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,20}$')).required(),
  passwordConfirm: Joi.ref('password'),
});
exports.UpdateUserSchema = Joi.object({
  name: Joi.string().min(4).max(20).optional(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'tn'] },
    })
    .optional(),
});
exports.UpdatePasswordSchema = Joi.object({
  passwordCurrent: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  passwordConfirm: Joi.ref('password'),
});
