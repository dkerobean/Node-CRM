const express = require('express');
const router = express.Router();
const messageController = require('../controllers/chat/messageController');
const upload = require('../middleware/uploadMiddleware');

// send message with optional file upload
router.post('/', upload.array('files', 5), messageController.sendMessage);
router.get('/:chatId', messageController.getMessages);

module.exports = router;
