const express = require('express');
const Joi = require('joi');
const { admin } = require('../config/firebase');
const authMiddleware = require('../middlewares/auth');
const userService = require('../services/user.service');

const router = express.Router();

// Validation schema for register
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  displayName: Joi.string().max(100).optional(),
  username: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.string().pattern(/^[+0-9\-()\s]{7,20}$/).optional(),
});

// POST /api/auth/register - server side create Firebase user & DB user (Variant B)
router.post('/register', async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      error.isJoi = true;
      return next(error);
    }
  const { email, password, displayName, username, phone } = value;

    // Create Firebase Auth user (will throw if email exists)
    const fbUser = await admin.auth().createUser({
      email,
      password,
      displayName,
      phoneNumber: phone || undefined,
    });

    // Optionally store username in custom claims if provided
    if (username) {
      await admin.auth().setCustomUserClaims(fbUser.uid, { username });
      // reflect new claims locally
      fbUser.customClaims = { username };
    }

    // Create local DB record
    const dbUser = await userService.createFromAdminRecord(fbUser);
    // If username explicitly provided but not set via claims or future logic, patch DB row
    if (username && !dbUser.username) {
      // Update to set username if still null
      try {
        dbUser.username = username;
      } catch (_) { /* ignore */ }
    }
    if (phone && !dbUser.phone) {
      dbUser.phone = phone;
    }

    return res.status(201).json({
      data: {
        id: dbUser.id,
        firebaseUid: dbUser.firebaseUid,
        email: dbUser.email,
        displayName: dbUser.displayName,
  photoUrl: dbUser.photoUrl,
  username: dbUser.username,
  phone: dbUser.phone,
        createdAt: dbUser.createdAt,
      },
      message: 'User registered successfully. Please sign in to obtain an ID token.'
    });
  } catch (err) {
    // Map Firebase errors
    if (err.code === 'auth/email-already-exists') {
      err.status = 409;
      err.code = 'EMAIL_EXISTS';
      err.message = 'Email already registered';
    }
    return next(err);
  }
});

// GET /api/auth/me - Get current user profile
router.get('/me', authMiddleware, (req, res) => {
  const { password, ...userWithoutPassword } = req.user;
  
  res.json({
    data: userWithoutPassword
  });
});

// POST /api/auth/logout - Optional logout endpoint
router.post('/logout', authMiddleware, (req, res) => {
  // For stateless auth, logout is handled on frontend
  // This endpoint can be used to revoke tokens if needed
  res.json({
    data: {
      message: 'Logged out successfully'
    }
  });
});

module.exports = router;
