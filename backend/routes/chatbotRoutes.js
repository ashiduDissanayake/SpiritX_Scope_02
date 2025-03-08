const express = require('express');
const chatbotController = require('../controllers/chatbotController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/query', auth, chatbotController.processQuery);

module.exports = router;