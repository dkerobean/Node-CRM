const express = require('express');

const fileController = require('../controllers/file/viewFile');
const { createFile } = require('../controllers/file/createFile');
const { deleteFile } = require('../controllers/file/deleteFile');
upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Upload a file
router.post('/upload', upload.single('file'), createFile);

// Get all files for an organization
router.get('/:organizationId', fileController.getFiles);

// Get a single file by ID
router.get('/file/:fileId', fileController.getFileById);

// Delete a file
router.delete('/file/:fileId', deleteFile);