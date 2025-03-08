const express = require('express');
const statsController = require('../controllers/statsController');

const router = express.Router();

router.get('/tournament-summary', statsController.getTournamentSummary);
router.get('/player-stats', statsController.getAllPlayerStats);

module.exports = router;