const Chat = require('../../models/chatModel');
const Message = require('../../models/messageModel');


// Create or get a chat between two users
exports.createOrGetChat = async (req, res) => {
    const { userId, otherUserId } = req.body;

    try {
        // Check if a chat already exists between the users
        let chat = await Chat.findOne({
            users: { $all: [userId, otherUserId] }
        });

        // If no chat exists, create a new one
        if (!chat) {
            chat = await Chat.create({
                users: [userId, otherUserId]
            });
        }

        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all chats for a user
exports.getUserChats = async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await Chat.find({ users: userId }).populate('users', 'name email');
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
