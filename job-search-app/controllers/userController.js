const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json({ message: 'User updated successfully', user });
};

const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
};

const getUser = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
};

const getUserProfile = async (req, res, next) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json({ user });
};

const updatePassword = async (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
    res.status(200).json({ message: 'Password updated successfully', user });
};


const getAccountsByRecoveryEmail = async (req, res, next) => {
    const { email } = req.params;
    const users = await User.find({ recoveryEmail: email });
    res.status(200).json({ users });
};

module.exports = { updateUser, deleteUser, getUser, getUserProfile, updatePassword, getAccountsByRecoveryEmail };
