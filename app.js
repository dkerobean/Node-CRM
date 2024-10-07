const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const taskRoutes = require('./routes/taskRoutes');
const auth = require('./middleware/authMiddleware');

dotenv.config();
connectDB();  // Connect to MongoDB

const app = express();
app.use(express.json());  // To parse JSON requests

// Use the user routes
app.use('/api', userRoutes);

// contact routes
app.use('/api/contact', auth, contactRoutes);

// task routes
app.use('/api/tasks', auth, taskRoutes);

module.exports = app;
