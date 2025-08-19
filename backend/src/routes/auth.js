const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

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
