const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @desc    Register new user
// @route   POST /api/auth/register
router.post('/register', authController.register);

// @desc    Login user
// @route   POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;
