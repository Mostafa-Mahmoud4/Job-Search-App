const express = require('express');
const router = express.Router();
const { errorHandle } = require('../middlewares/errorHandler');
const { signUp, signIn, forgetPassword, verifyEmail, resetPassword } = require('../controllers/authController');
const { validationMiddleware } = require('../middlewares/validation');
const { userSchema, signInSchema, passwordUpdateValidation } = require('../validators/userValidation');

router.post('/signup', validationMiddleware({ body: userSchema }), errorHandle(signUp));
router.post('/signin', validationMiddleware({ body: signInSchema }), errorHandle(signIn));
router.post('/forgot-password', errorHandle(forgetPassword));
router.post('/reset-password', validationMiddleware({ body: passwordUpdateValidation }), errorHandle(resetPassword));
router.get('/verify-email', errorHandle(verifyEmail));

module.exports = router;
