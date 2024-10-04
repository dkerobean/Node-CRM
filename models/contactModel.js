const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: { type: String, required: true, trim: true},
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address'] // Email validation
     },
     phone: { type: String, required: true, trim: true},
     company: { type: String, required: true, trim: true},
     position: { type: String, trim: true },
     notes: { type: String, trim: true },
     status: {
        type: String,
        enum: ['lead', 'client', 'prospect'],
        default: 'prospect'
     },
     createdAt : { type: Date, default: Date.now },
     updatedAt : { type: Date, default: Date.now },
     assignedTo: { Schema.Types.ObjectId, ref: 'User' }

    });

    // Create a hook to update the `updatedAt` field before saving
    ContactSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
    });

    const Contact = mongoose.model('Contact', ContactSchema);

    module.exports = Contact;