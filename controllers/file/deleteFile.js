const File = require('../../models/fileModel');

const fs = require('fs');
const path = require('path');

// Delete a file
const deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;

        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Remove the file from the filesystem
        fs.unlink(path.join(__dirname, '../', file.path), async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting file from storage', err });
            }

            // Remove file from the database
            await file.remove();
            res.status(200).json({ message: 'File deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting file', error });
    }
};

module.exports = { deleteFile };
