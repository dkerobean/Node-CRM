const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    title: {
        type: 'String',
        required: true,
        trim: true,
    },
    description: {
        type: 'String',
        required: true,
        trim: true,
    },
    label: {
        enum: ['Work', 'Personal', 'Important'],
        default: 'Personal'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPinned: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: true,
    });


module.exports = mongoose.model('Note', noteSchema);