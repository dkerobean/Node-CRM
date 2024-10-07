const Task = require("../../models/taskModel");
const User = require("../../models/userModel");

const createTask = async (req, res) => {
    try {
        const { description, assignee, dueDate, priority } = req.body;
        adminId = req.user._id;

        // check if assignee exists
        const UserExists = await User.findById(assignee);
        if (!UserExists) {
            return res.status(404).json({ message: 'Assignee not found' });
        }

        // crete a task
        const newTask = new Task ({
            description,
            assignee,
            dueDate,
            priority,
            createdBy: adminId,
        });

        // save the task
        await newTask.save();

        response.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });

    } catch (error) {
        console.log('Error creating task:', error);
        res.status(500).json({message: 'Server error' });
    }
};

module.exports = { createTask };