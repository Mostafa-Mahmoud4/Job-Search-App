const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendForgotPasswordEmail } = require('../services/emailService');

const signUp = async (req, res, next) => {
    const { firstName, lastName, email, password, recoveryEmail, DOB, mobileNumber, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        firstName,
        lastName,
        username: `${firstName}${lastName}`,
        email,
        password: hashedPassword,
        recoveryEmail,
        DOB,
        mobileNumber,
        role,
    });
    await user.save();

    const verificationToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    await sendVerificationEmail(user.email, verificationToken);

    res.status(201).json({ message: 'User created successfully. Please verify your email.', user });
};

const verifyEmail = async (req, res) => {
    const { token } = req.query;
  
    if (!token) {
      return res.status(400).json({ message: 'Verification token is missing' });
    }
  
    
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.isVerified = true;
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully' });
    
      res.status(400).json({ message: 'Invalid or expired token' });
    
  };

  const signIn = async (req, res) => {
    const { email, password } = req.body;
  
    // Find user by email
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Check if user is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: 'Email not verified' });
    }
  
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
  
    // Update user status to online
    user.status = 'online';
    await user.save();
  
    res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
  };

  const forgetPassword = async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Generate password reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();
  
    // Send forgot password email
    await sendForgotPasswordEmail(user.email, resetToken);
  
    res.status(200).json({ message: 'Password reset email sent' });
  };

  const resetPassword = async (req, res) => {
    const { token } = req.query;
    
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });
  
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }
  
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
  
    res.status(200).json({ message: 'Password reset successful' });
  };

module.exports = { signUp, signIn, forgetPassword, verifyEmail, resetPassword };
