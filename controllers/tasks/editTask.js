const Task = require("../../models/taskModel");
const User = require("../../models/userModel");

const editTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { name, description, assignee, dueDate, priority, status } = req.body;

        // Validate required fields
        if (!name || !description || !dueDate) {
            return res.status(400).json({ message: 'Name, description, and due date are required fields.' });
        }

        // Check if the assigned user exists, if it's being updated
        if (assignee) {
            const userExists = await User.findById(assignee);
            if (!userExists) {
                return res.status(404).json({ message: 'Assigned user not found.' });
            }
        }

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            {
                name,
                description,
                assignee: assignee || null, // Set to null if no assignee is provided
                dueDate,
                priority: priority || 'Low', // Default to 'Low' if not provided
                status: status || 'Pending' // Default to 'Pending' if not provided
            },
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        return res.status(200).json({
            message: 'Task updated successfully',
            task: updatedTask
        });

    } catch (error) {
        console.error('Error editing task:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { editTask };