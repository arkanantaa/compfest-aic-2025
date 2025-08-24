const express = require('express');
const proposalController = require('../controllers/proposal.controller');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

const router = express.Router();

// POST /api/proposals
router.post('/', authMiddleware, proposalController.create);

// GET /api/proposals/my-proposals
router.get('/my-proposals', authMiddleware, proposalController.getMyProposals);

// GET /api/proposals
router.get('/', authMiddleware, adminMiddleware, proposalController.getAll);

// GET /api/proposals/:id
router.get('/:id', authMiddleware, proposalController.getById);

// PATCH /api/proposals/:id/status
router.patch('/:id/status', authMiddleware, adminMiddleware, proposalController.updateStatus);

module.exports = router;
