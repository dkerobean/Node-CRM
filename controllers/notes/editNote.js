const Note = require('../../models/noteModel');

const editNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const {title, description, label} = req.body;

        // validate fields
        if (!title || !description){
            return res.status(400).json({ message: 'Invalid title or description'});
        }

        // update note
        const updatedNote = await Note.findByIdAndUpdate(
            { _id: noteId, createdBy: req.user._id },
            {
                title,
                description,
                label
            },
            {new: true}
        );

        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });

        }

        return res.status(200).json({
            message: 'Note updated successfully',
            note: updatedNote
        });

    } catch (error) {
        console.error('Error editing note:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


module.exports = { editNote };