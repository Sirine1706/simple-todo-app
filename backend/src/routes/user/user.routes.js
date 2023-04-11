const express = require('express');
const validator = require('../../middlewares/validator');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../../controllers/auth.controllers');
const { protect, getMe } = require('../../middlewares/userMiddleware');
const {
  updateMe,
  deleteMe,
  createUser,
  getUsers,
  getUser,
} = require('../../controllers/user.controllers');
const { UpdateUserSchema, UpdatePasswordSchema } = require('./userSchema');

const router = express.Router();

router.post('/', protect, createUser);
router.get('/:id', protect, getUser);
router.get('/', protect, getUsers);
router.get('/me', protect, getMe, getUser);
router.put('/me', protect, validator(UpdateUserSchema), updateMe);
router.delete('/me', protect, deleteMe);
router.patch('/update-password', protect, updatePassword);
router.post('/sign', signup);
router.post('/login', login);
router.post('/forget-password', forgotPassword);
router.patch(
  '/reset-password/:token',
  validator(UpdatePasswordSchema),
  resetPassword
);

module.exports = router;
