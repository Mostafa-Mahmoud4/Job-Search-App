const express = require('express');
const router = express.Router();
const { errorHandle } = require('../middlewares/errorHandler');
const { signUp, signIn, forgetPassword, verifyEmail, resetPassword } = require('../controllers/authController');
const { validationMiddleware } = require('../middlewares/validation');
const { userSchema, signInSchema, passwordUpdateValidation } = require('../validators/userValidation');

/**
 * Route for user signup.
 * @route POST /signup
 * @param {object} req - The request object containing user details.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.post('/signup', validationMiddleware({ body: userSchema }), errorHandle(signUp));

/**
 * Route for user signin.
 * @route POST /signin
 * @param {object} req - The request object containing signin details.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.post('/signin', validationMiddleware({ body: signInSchema }), errorHandle(signIn));

/**
 * Route for requesting password reset.
 * @route POST /forgot-password
 * @param {object} req - The request object containing the user's email.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.post('/forgot-password', errorHandle(forgetPassword));

/**
 * Route for resetting the user's password.
 * @route POST /reset-password
 * @param {object} req - The request object containing the new password.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.post('/reset-password', validationMiddleware({ body: passwordUpdateValidation }), errorHandle(resetPassword));

/**
 * Route for email verification.
 * @route GET /verify-email
 * @param {object} req - The request object containing the verification token.
 * @param {object} res - The response object.
 * @param {function} next - The next middleware function.
 */
router.get('/verify-email', errorHandle(verifyEmail));

module.exports = router;
