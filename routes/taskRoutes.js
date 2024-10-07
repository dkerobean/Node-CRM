const express = require('express');
const { getAllTasks } = require('../controllers/tasks/viewTasks');
const { createTask } = require('../controllers/tasks/createTask');
const { editTask } = require('../controllers/tasks/editTask');
const router = express.Router();

// view all tasks
router.get('/all', getAllTasks);

// create task
router.post('/add', createTask);

// edit task
router.put('/edit/:taskId', editTask);

module.exports = router;