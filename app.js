const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { swaggerUi, swaggerDocs } = require('./swagger');

// routes
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const taskRoutes = require('./routes/taskRoutes');
const dealRoutes = require('./routes/dealRoutes');
const noteRoutes = require('./routes/noteRoutes');
const metricsRoutes = require('./routes/metricRoutes');

// middleware routes
const auth = require('./middleware/authMiddleware');
const isAdmin = require('./middleware/isAdmin');


dotenv.config();
connectDB();  // Connect to MongoDB

const app = express();
app.use(express.json());  // To parse JSON requests

// Swagger UI setup
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use the user routes
app.use('/api', userRoutes);

// contact routes
app.use('/api/contact', auth, contactRoutes);

// task routes
app.use('/api/tasks', auth, isAdmin, taskRoutes);

// deal routes
app.use('/api/deals', auth, dealRoutes);

// note routes
app.use('/api/notes', auth, noteRoutes);

// metric routes
app.use('/api/metrics', auth, metricsRoutes);


module.exports = app;
