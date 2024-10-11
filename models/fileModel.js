const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const File = mongoose.model('File', fileSchema);
module.exports = File;

