const express = require('express');
const { getAllTasks } = require('../controllers/tasks/viewTasks');
const { createTask } = require('../controllers/tasks/createTask');
const { editTask } = require('../controllers/tasks/editTask');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: API for managing tasks
 */

/**
 * @swagger
 * /api/tasks/all:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Successfully retrieved all tasks
 *       500:
 *         description: Internal server error
 */
router.get('/all', getAllTasks);

/**
 * @swagger
 * /api/tasks/add:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: A detailed description of the task
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date of the task
 *               assignedTo:
 *                 type: string
 *                 description: The ID of the user the task is assigned to
 *             required:
 *               - title
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Internal server error
 */
router.post('/add', createTask);

/**
 * @swagger
 * /api/tasks/edit/{taskId}:
 *   put:
 *     summary: Edit an existing task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         description: The ID of the task to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: A detailed description of the task
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *                 description: The due date of the task
 *               assignedTo:
 *                 type: string
 *                 description: The ID of the user the task is assigned to
 *     responses:
 *       200:
 *         description: Task edited successfully
 *       404:
 *         description: Task not found
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Internal server error
 */
router.put('/edit/:taskId', editTask);

module.exports = router;
