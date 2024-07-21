const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userTechSkills: {
    type: [String],
    required: true,
  },
  userSoftSkills: {
    type: [String],
    required: true,
  },
  userResume: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Application', applicationSchema);
