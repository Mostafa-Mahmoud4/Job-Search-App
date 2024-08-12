const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { errorHandle } = require('../middlewares/errorHandler');
const { validationMiddleware } = require('../middlewares/validation');
const { updateUserValidation, passwordUpdateValidation } = require('../validators/userValidation');
const { updateUser, deleteUser, getUser, getUserProfile, updatePassword, getAccountsByRecoveryEmail } = require('../controllers/userController');

/**
 * Route to update a user by ID.
 * @route PUT /:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @param {object} req - The request object containing the user ID and update data.
 * @param {object} res - The response object confirming the user update.
 * @param {function} next - The next middleware function.
 */
router.put('/:id', authenticate, validationMiddleware({ body: updateUserValidation }), errorHandle(updateUser));

/**
 * Route to delete a user by ID.
 * @route DELETE /:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @param {object} req - The request object containing the user ID.
 * @param {object} res - The response object confirming the user deletion.
 * @param {function} next - The next middleware function.
 */
router.delete('/:id', authenticate, errorHandle(deleteUser));

/**
 * Route to get a user by ID.
 * @route GET /:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @param {object} req - The request object containing the user ID.
 * @param {object} res - The response object containing the user data.
 * @param {function} next - The next middleware function.
 */
router.get('/:id', authenticate, errorHandle(getUser));

/**
 * Route to get the profile of a user by ID.
 * @route GET /profile/:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @param {object} req - The request object containing the user ID.
 * @param {object} res - The response object containing the user's profile data.
 * @param {function} next - The next middleware function.
 */
router.get('/profile/:id', authenticate, errorHandle(getUserProfile));

/**
 * Route to update a user's password by ID.
 * @route PUT /password/:id
 * @middleware authenticate - Ensures the user is authenticated.
 * @param {object} req - The request object containing the user ID and new password.
 * @param {object} res - The response object confirming the password update.
 * @param {function} next - The next middleware function.
 */
router.put('/password/:id', authenticate, validationMiddleware({ body: passwordUpdateValidation }), errorHandle(updatePassword));

/**
 * Route to get accounts associated with a recovery email.
 * @route GET /recovery/:email
 * @middleware authenticate - Ensures the user is authenticated.
 * @param {object} req - The request object containing the recovery email.
 * @param {object} res - The response object containing the accounts associated with the provided email.
 * @param {function} next - The next middleware function.
 */
router.get('/recovery/:email', authenticate, errorHandle(getAccountsByRecoveryEmail));

module.exports = router;
