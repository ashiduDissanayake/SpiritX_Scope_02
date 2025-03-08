const express = require('express');
const teamController = require('../controllers/teamController');
const auth = require('../middleware/auth');

const router = express.Router();

// User team management (requires auth)
router.get('/my-team', auth, teamController.getUserTeam);
router.post('/add-player/:playerId', auth, teamController.addPlayerToTeam);
router.delete('/remove-player/:teamPlayerId', auth, teamController.removePlayerFromTeam);

// Leaderboard (public)
router.get('/leaderboard', teamController.getLeaderboard);

module.exports = router;