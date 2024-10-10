const mongoose = require('mongoose');


const dealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['Prospect', 'Negotiation', 'Closed Won', 'Closed Lost'],
        default: 'Prospect',
    },
    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact',
        required: true,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    closeDate: {
        type: Date,
    },
    stage: {
        type: String,
        enum: ['Initial Contact', 'Qualification', 'Proposal', 'Negotiation', 'Final Review', 'Closed'],
        default: 'Initial Contact',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    notes: {
        type: String,
    },
    files: [{ 
        fileName: { type: String, required: true },
        filePath: { type: String, required: true }, // Path to the stored file
        uploadedAt: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
});

module.exports = mongoose.model('Deal', dealSchema);
