const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recoveryEmail: {
    type: String,
  },
  DOB: {
    type: Date,
    required: true,
  },
  mobileNumber: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ['User', 'Company_HR'],
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken:{ 
    type: String 
  },
  resetPasswordExpire: {
    type: Date
  },
  status: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
  },
});

module.exports = mongoose.model('User', userSchema);
