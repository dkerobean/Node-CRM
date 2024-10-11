const fs = require('fs');
const path = require('path');
const File = require('../../models/fileModel');

// Delete a file
const deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;

        // Find the file in the database
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        // Construct the correct file path
        const filePath = path.join(__dirname, '../../uploads', file.name);
        // Remove the file from the filesystem
        fs.unlink(filePath, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error deleting file from storage', err });
            }

            // Remove the file record from the database
            await File.findByIdAndDelete(fileId);
            res.status(200).json({ message: 'File deleted successfully' });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting file', error });
    }
};

module.exports = { deleteFile };
