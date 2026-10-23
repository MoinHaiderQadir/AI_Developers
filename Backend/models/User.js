const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:   { type: String, required: true },
  email:      { type: String, required: true, unique: true },
  password:   { type: String, required: true },
  role:       { type: String, enum: ['user', 'admin'], default: 'user' },
  isAnonymous:{ type: Boolean, default: false },

  // Users can follow incidents
  followedReports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Incident' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
