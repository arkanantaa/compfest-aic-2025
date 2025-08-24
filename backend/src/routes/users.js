const express = require('express');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// GET /api/users/me
router.get('/me', authMiddleware, userController.getMe);

// PATCH /api/users/me
router.patch('/me', authMiddleware, userController.updateMe);

module.exports = router;