const Joi = require('joi');

const userSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  recoveryEmail: Joi.string().email(),
  DOB: Joi.date().required(),
  mobileNumber: Joi.string().required(),
  role: Joi.string().valid('User', 'Company_HR').required(),
  status: Joi.string().valid('online', 'offline'),
});

const updateUserValidation = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  recoveryEmail: Joi.string().email(),
  DOB: Joi.date(),
  mobileNumber: Joi.string(),
});

const passwordUpdateValidation = Joi.object({
  password: Joi.string().required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  userSchema,
  updateUserValidation,
  passwordUpdateValidation,
  signInSchema,
};
