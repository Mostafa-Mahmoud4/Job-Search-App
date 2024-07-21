const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  workingTime: {
    type: String,
    required: true,
  },
  seniorityLevel: {
    type: String,
    enum: ['Junior', 'Mid-Level', 'Senior', 'Team-Lead', 'CTO'],
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  technicalSkills: {
    type: [String],
    required: true,
  },
  softSkills: {
    type: [String],
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
});

module.exports = mongoose.model('Job', jobSchema);
