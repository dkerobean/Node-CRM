const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['lead', 'client', 'prospect'],
        default: 'prospect'
    },
    leadDetails: {
        status: { type: String, enum: ['New', 'In Progress', 'Closed'], default: 'New' },
        priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
        followUpDate: { type: Date }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: false, trim: true },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
});

// Hook to update `updatedAt` before saving
ContactSchema.pre('save', function (next) {
    this.updatedAt = Date.now();

    // Conditionally remove leadDetails if status is not 'lead'
    if (this.status !== 'lead') {
        this.leadDetails = undefined; // Remove the leadDetails field
    }

    next();
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;
