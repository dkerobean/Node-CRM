const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();
connectDB();  // Connect to MongoDB

const app = express();
app.use(express.json());  // To parse JSON requests

// Use the user routes
app.use('/api', userRoutes);

// contact routes
app.use('/api/contact', contactRoutes);

module.exports = app;
