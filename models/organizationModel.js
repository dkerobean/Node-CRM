const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  createdAt: { type: Date, default: Date.now },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // References the owner user
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Array of user IDs associated with the organization
  }],
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
