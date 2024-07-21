const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
const { errorHandle } = require('../middlewares/errorHandler');
const { validationMiddleware } = require('../middlewares/validation');
const { updateUserValidation, passwordUpdateValidation } = require('../validators/userValidation');
const { updateUser, deleteUser, getUser, getUserProfile, updatePassword, getAccountsByRecoveryEmail } = require('../controllers/userController');

router.put('/:id', authenticate, validationMiddleware({ body: updateUserValidation }), errorHandle(updateUser));
router.delete('/:id', authenticate, errorHandle(deleteUser));
router.get('/:id', authenticate, errorHandle(getUser));
router.get('/profile/:id', authenticate, errorHandle(getUserProfile));
router.put('/password/:id', authenticate, validationMiddleware({ body: passwordUpdateValidation }), errorHandle(updatePassword));
router.get('/recovery/:email', authenticate, errorHandle(getAccountsByRecoveryEmail));

module.exports = router;
