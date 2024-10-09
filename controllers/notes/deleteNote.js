const Note = require('../../models/noteModel');


const deleteNote =  async (req, res) => {
    try {

        const noteId = req.params;

        // find and delete the note
        const deletedNote = await Note.findByIdAndDelete({
             _id: noteId,
             createdBy: req.user._id
            });

        if (!deletedNote) {
            return res.status(404).json({message: 'Note not found'});
        }

        return res.status(200).json({
            message: 'Note deleted successfully',
            note: deletedNote
        });
    } catch (error) {
        console.error('Error deleting note:', error);
        return res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

module.exports = { deleteNote };
