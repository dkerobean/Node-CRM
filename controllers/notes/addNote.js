const Note = require('../../models/noteModel');


const addNote = async (req, res) => {
    try {
        const {title, description, label} = req.body;

        // validatefields
        if (!title || !description) {
            return res.status(400).json({
                message: 'Title and description must be provided',
            });
        }

        // create new note
        const newNote = new Note ({
            title,
            description,
            label,
            createdBy: req.user._id
        });

        // save new note
        const savedNote = await newNote.save();
        res.status(201).json({
            message: 'Note saved successfully',
            note: savedNote
        });
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { addNote };