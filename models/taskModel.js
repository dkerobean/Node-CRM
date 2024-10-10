const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
     },
     status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
     },
     organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
     createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
     },
     notifications: {
        type: Boolean,
        default: true,
     },
}, {
    timestamps: true // Automatically manages createdAt and updatedAt fields
});

module.exports = mongoose.model('Task', taskSchema);