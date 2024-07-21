const Joi = require('joi');

const applicationSchema = Joi.object({
  jobId: Joi.string().required(),
  userId: Joi.string().required(),
  userTechSkills: Joi.array().items(Joi.string()).required(),
  userSoftSkills: Joi.array().items(Joi.string()).required(),
  userResume: Joi.string().required(),
});

const updateApplicationValidation = Joi.object({
  userTechSkills: Joi.array().items(Joi.string()),
  userSoftSkills: Joi.array().items(Joi.string()),
  userResume: Joi.string(),
});

module.exports = {
  applicationSchema,
  updateApplicationValidation,
};
