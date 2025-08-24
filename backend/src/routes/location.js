const express = require('express');
const locationController = require('../controllers/location.controller');
const authMiddleware = require('../middlewares/auth');
const adminMiddleware = require('../middlewares/admin');

const router = express.Router();

// POST /api/locations
router.post('/', authMiddleware, locationController.create);

// GET /api/locations
router.get('/', locationController.getAll);

// GET /api/locations/:id
router.get('/:id', locationController.getById);

// PATCH /api/locations/:id
router.patch('/:id', authMiddleware, adminMiddleware, locationController.update);

// DELETE /api/locations/:id
router.delete('/:id', authMiddleware, adminMiddleware, locationController.delete);

module.exports = router;
