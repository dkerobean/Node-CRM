const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        validate: {
            validator: function (v) {
                return v.length === 2; // Ensure exactly two users
            },
            message: 'A chat must have exactly two users.'
        },
        required: true
    },
    lastMessage: {
        type: String,
        default: ''
    },
    lastMessageAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
