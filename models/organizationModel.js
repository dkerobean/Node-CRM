const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  phone: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  createdAt: { type: Date, default: Date.now },
  // Optional: Store reference to the organization owner or admin
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Organization = mongoose.model('Organization', organizationSchema);
module.exports = Organization;
