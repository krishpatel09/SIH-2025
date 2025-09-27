const express = require('express');
const AuthController = require('../controllers/AuthController');
const { protect, authorize } = require('../middleware/auth');
const { 
  validateRegister, 
  validateLogin, 
  validateProfileUpdate, 
  validatePasswordChange 
} = require('../middleware/authValidation');

const router = express.Router();
const authController = new AuthController();

// Public routes
router.post('/register', validateRegister, authController.register.bind(authController));
router.post('/login', validateLogin, authController.login.bind(authController));

// Protected routes
router.get('/profile', protect, authController.getProfile.bind(authController));
router.put('/profile', protect, validateProfileUpdate, authController.updateProfile.bind(authController));
router.put('/change-password', protect, validatePasswordChange, authController.changePassword.bind(authController));
router.get('/verify', protect, authController.verifyToken.bind(authController));

// Admin only routes
router.get('/users', protect, authorize('admin'), authController.getAllUsers.bind(authController));

module.exports = router;
