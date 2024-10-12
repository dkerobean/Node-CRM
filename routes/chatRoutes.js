const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat/chatController');

router.post('/create', chatController.createOrGetChat);
router.get('/:userId', chatController.getUserChats);

module.exports = router;
