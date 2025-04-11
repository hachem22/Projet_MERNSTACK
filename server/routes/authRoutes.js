const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', authController.register);

// @route   GET /api/auth/me
// @desc    Get current user data
// @access  Private
router.get('/me', protect, authController.getMe);

// @route   GET /api/auth/verify
// @desc    Verify token validity
// @access  Private
router.get('/verify', protect, authController.verifyToken);

// @route   GET /api/auth/check-email
// @desc    Check if email exists
// @access  Public
router.get('/check-email', authController.checkEmail);

module.exports = router;
