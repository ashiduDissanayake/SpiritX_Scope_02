const express = require('express');
const playerController = require('../controllers/playerController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// Public routes
router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);

// Admin-only routes
router.post('/', adminAuth, playerController.createPlayer);
router.put('/:id', adminAuth, playerController.updatePlayer);
router.delete('/:id', adminAuth, playerController.deletePlayer);

module.exports = router;