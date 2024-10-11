const File = require('../../models/fileModel');

// Get files for an organization
exports.getFiles = async (req, res) => {
    try {
        const { organizationId } = req.params;

        const files = await File.find({ organization: organizationId })
            .populate('uploadedBy', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching files', error });
    }
};

// Get a single file by its ID
exports.getFileById = async (req, res) => {
    try {
        const { fileId } = req.params;

        const file = await File.findById(fileId).populate('uploadedBy', 'name email');
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        res.status(200).json(file);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching file', error });
    }
};
