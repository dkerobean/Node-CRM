const Note = require('../../models/noteModel');

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json({
            message: "Notes retrieved Successfully",
            notes
        });
    } catch (error) {
    console.error('Error retrieving notes:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { getAllNotes };

