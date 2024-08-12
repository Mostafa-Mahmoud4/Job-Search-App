const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendVerificationEmail, sendForgotPasswordEmail } = require('../services/emailService');

/**
 * Signs up a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
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

/**
 * Verifies a user's email.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const verifyEmail = async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Verification token is missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

/**
 * Signs in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const signIn = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isVerified) {
        return res.status(401).json({ message: 'Email not verified' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });

    user.status = 'online';
    await user.save();

    res.status(200).json({ token, user: { id: user._id, email: user.email, role: user.role } });
};

/**
 * Sends a forgot password email to the user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const forgetPassword = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    await sendForgotPasswordEmail(user.email, resetToken);

    res.status(200).json({ message: 'Password reset email sent' });
};

/**
 * Resets a user's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
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

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
};

module.exports = { signUp, signIn, forgetPassword, verifyEmail, resetPassword };
