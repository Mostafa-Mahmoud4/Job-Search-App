const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

/**
 * Updates a user's information.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'User updated successfully', user });
};

/**
 * Deletes a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
};

/**
 * Retrieves a user by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
};

/**
 * Retrieves a user's profile by their ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getUserProfile = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
};

/**
 * Updates a user's password.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    res.status(200).json({ message: 'Password updated successfully', user });
};

/**
 * Retrieves user accounts by their recovery email.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const getAccountsByRecoveryEmail = async (req, res, next) => {
    const { email } = req.params;
    const users = await User.find({ recoveryEmail: email });
    res.status(200).json({ users });
};

module.exports = { updateUser, deleteUser, getUser, getUserProfile, updatePassword, getAccountsByRecoveryEmail };
