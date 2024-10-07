const express = require('express');
const { getAllTasks } = require('../controllers/tasks/viewTasks');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// view all tasks
router.get('/tasks', auth, getAllTasks);