const express = require('express');
const aiController = require('../controllers/ai.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

// POST /api/ai/generate
router.post('/generate', authMiddleware, aiController.generate);

module.exports = router;
