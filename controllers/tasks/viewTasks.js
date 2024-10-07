const Task = require("../../models/taskModel");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        return res.status(200).json({
            message: "Tasks retrieved Successfully",
            tasks
        });
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { getAllTasks };
