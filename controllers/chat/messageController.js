
const Message = require('../../models/messageModel');
const Chat = require('../../models/chatModel');

// Send a message in a chat
exports.sendMessage = async (req, res) => {
    const { chatId, senderId, message } = req.body;
    const io = req.app.get('io'); // Get the Socket.io instance

    try {
        // Collect uploaded file paths
        const files = req.files.map(file => file.path);

        // Create a new message
        const newMessage = await Message.create({
            chat: chatId,
            sender: senderId,
            message,
            files
        });

        // Update the last message in the chat
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: message || (files.length > 0 ? 'File Attachment' : ''),
            lastMessageAt: Date.now()
        });

        // Emit the new message to all users in the chat room
        io.to(chatId).emit('newMessage', {
            chatId,
            senderId,
            message,
            files,
            timestamp: new Date()
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get messages for a chat
exports.getMessages = async (req, res) => {
    const chatId = req.params.chatId;

    try {
        const messages = await Message.find({ chat: chatId }).populate('sender', 'name email');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
