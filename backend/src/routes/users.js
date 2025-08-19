const express = require('express');
const Joi = require('joi');
const authMiddleware = require('../middlewares/auth');
const userService = require('../services/user.service');

const router = express.Router();

// Validation schemas
const updateUserSchema = Joi.object({
  displayName: Joi.string().max(100).optional(),
  photoUrl: Joi.string().uri().optional(),
});

// GET /api/users/me - Get current user profile
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    data: req.user
  });
});

// PATCH /api/users/me - Update current user profile
router.patch('/me', authMiddleware, async (req, res, next) => {
  try {
    // Validate request body
    const { error, value } = updateUserSchema.validate(req.body);
    if (error) {
      error.isJoi = true;
      return next(error);
    }

    // Update user
    const updatedUser = await userService.updateUser(req.user.id, value);

    res.json({
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
