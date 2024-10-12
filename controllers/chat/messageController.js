const Chat = require('../../models/chatModel');
const Message = require('../../models/messageModel');

// Send a message in a chat
exports.sendMessage = async (req, res) => {
    const { chatId, senderId, message } = req.body;

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
