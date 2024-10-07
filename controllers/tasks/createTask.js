const Task = require("../../models/taskModel");
const User = require("../../models/userModel");
const { sendTaskNotificationEmail } = require('../../middleware/sendTaskNotification');

const createTask = async (req, res) => {
    try {
        const { name, description, assignee, dueDate, priority, createdBy } = req.body;
        adminId = req.user._id;

        // check if assignee exists
        const UserExists = await User.findById(assignee);
        if (!UserExists) {
            return res.status(404).json({ message: 'Assignee not found' });
        }

        // crete a task
        const newTask = new Task ({
            name,
            description,
            assignee,
            dueDate,
            priority,
            createdBy: adminId,
        });

        // save the task
        await newTask.save();

        // Format the due date for the notification
        const formattedDueDate = new Date(dueDate).toLocaleDateString(); // Format the due date

        // Send notification to the assignee
        const subject = 'New Task Assigned';
        const text = `Hello ${UserExists.name},\n\nYou have been assigned a new task: "${name}".\nDue Date: ${dueDate}\n\nBest Regards,\nYour Team`;
        await sendTaskNotificationEmail(UserExists.email, newTask.name, formattedDueDate); // Send notification

        res.status(201).json({
            message: 'Task created successfully',
            task: newTask
        });

    } catch (error) {
        console.log('Error creating task:', error);
        res.status(500).json({message: 'Server error' });
    }
};

module.exports = { createTask };
