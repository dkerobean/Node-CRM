const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({

    title: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true
    },
    label: {
        enum: ['Work', 'Personal', 'Important']
    },
    {
        timestamps: true,
    }
);


module.exports = 