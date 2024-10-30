const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Points to the user who owns the organization
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Array of user IDs linked to this organization
    }],
});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
