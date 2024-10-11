const File = require('../../models/fileModel');

const uploadFile = async (req, res) => {
    try {
        const { organizationId } = req.body;
        const userId = req.user.id; 

        // Create a new file document
        const file = new File({
            name: req.file.filename,
            path: req.file.path,
            originalName: req.file.originalname,
            organization: organizationId,
            uploadedBy: userId,
        });

        await file.save();
        res.status(201).json({ message: 'File uploaded successfully', file });
    } catch (error) {
        res.status(500).json({ message: 'Error uploading file', error });
    }
};

module.exports = { uploadFile };