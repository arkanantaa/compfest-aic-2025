const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', authController.register);

// GET /api/auth/me
router.get('/me', authMiddleware, authController.getMe);

// POST /api/auth/logout
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;