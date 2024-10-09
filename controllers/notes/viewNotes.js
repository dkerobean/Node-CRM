const Note = require('../../models/noteModel');

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({
            message: "Notes retrieved Successfully",
            tasks
        });
    } catch (error) {
    console.error('Error retrieving tasks:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { getAllNotes };

