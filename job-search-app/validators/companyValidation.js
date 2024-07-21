const Joi = require('joi');

const companySchema = Joi.object({
  companyName: Joi.string().required(),
  description: Joi.string().required(),
  industry: Joi.string().required(),
  address: Joi.string().required(),
  numberOfEmployees: Joi.string().required(),
  companyEmail: Joi.string().email().required(),
  companyHR: Joi.string().required(),
});

const updateCompanyValidation = Joi.object({
  companyName: Joi.string(),
  description: Joi.string(),
  industry: Joi.string(),
  address: Joi.string(),
  numberOfEmployees: Joi.string(),
  companyEmail: Joi.string().email(),
});

module.exports = {
  companySchema,
  updateCompanyValidation,
};
