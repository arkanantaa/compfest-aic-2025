const Joi = require('joi');
const { admin } = require('../config/firebase');
const userService = require('../services/user.service');

// Validation schema for register
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  displayName: Joi.string().max(100).optional(),
  username: Joi.string().alphanum().min(3).max(30).optional(),
  phone: Joi.string().pattern(/^[+0-9\-()\s]{7,20}$/).optional(),
});

class AuthController {
  async register(req, res, next) {
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

  // Create local DB record (persist username / phone explicitly)
  const dbUser = await userService.createFromAdminRecord(fbUser, { username, phone });

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
      // Map Firebase errors without mutating read-only properties
      if (err.code === 'auth/email-already-exists') {
        return res.status(409).json({
          error: {
            code: 'EMAIL_EXISTS',
            message: 'Email already registered'
          }
        });
      }
      if (err.code === 'auth/invalid-password') {
        return res.status(400).json({
          error: {
            code: 'INVALID_PASSWORD',
            message: 'Password does not meet requirements'
          }
        });
      }
      if (err.code === 'auth/invalid-email') {
        return res.status(400).json({
          error: {
            code: 'INVALID_EMAIL',
            message: 'Email format is invalid'
          }
        });
      }
      return next(err); // fall through to global error handler
    }
  }

  getMe(req, res) {
    const { password, ...userWithoutPassword } = req.user;
    
    res.json({
      data: userWithoutPassword
    });
  }

  logout(req, res) {
    // For stateless auth, logout is handled on frontend
    // This endpoint can be used to revoke tokens if needed
    res.json({
      data: {
        message: 'Logged out successfully'
      }
    });
  }
}

module.exports = new AuthController();
