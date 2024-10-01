const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' }, // 'admin', 'user'
  organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }, // References the organization
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
