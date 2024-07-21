const Joi = require('joi');

const jobSchema = Joi.object({
  jobTitle: Joi.string().required(),
  jobLocation: Joi.string().required(),
  workingTime: Joi.string().required(),
  seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO').required(),
  jobDescription: Joi.string().required(),
  technicalSkills: Joi.array().items(Joi.string()).required(),
  softSkills: Joi.array().items(Joi.string()).required(),
  addedBy: Joi.string().required(),
});

const updateJobValidation = Joi.object({
  jobTitle: Joi.string(),
  jobLocation: Joi.string(),
  workingTime: Joi.string(),
  seniorityLevel: Joi.string().valid('Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'),
  jobDescription: Joi.string(),
  technicalSkills: Joi.array().items(Joi.string()),
  softSkills: Joi.array().items(Joi.string()),
});

module.exports = {
  jobSchema,
  updateJobValidation,
};
