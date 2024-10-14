const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create an HTTP server
const server = http.createServer(app);
console.log('server');

// Initialize Socket.io
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins (you can specify specific URLs in production)
        methods: ['GET', 'POST']
    }
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for a user joining a chat room
    socket.on('joinChat', (chatId) => {
        socket.join(chatId);
        console.log(`User with ID ${socket.id} joined chat room ${chatId}`);
    });

    console.log(io);

    // Listen for a new message and emit it to the chat room
    socket.on('sendMessage', (messageData) => {
        const { chatId, senderId, message, files } = messageData;
        io.to(chatId).emit('newMessage', {
            chatId,
            senderId,
            message,
            files,
            timestamp: new Date()
        });
    });

    // Handle user disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
