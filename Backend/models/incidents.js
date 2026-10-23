const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    enum: ['waste', 'water', 'air', 'deforestation', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'verified', 'in_progress', 'resolved'],
    default: 'new'
  },
  photoUrl: { type: String },

  // Store lat/lng as plain numbers (simplified)
  latitude:  { type: Number, required: true },
  longitude: { type: Number, required: true },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }

}, { timestamps: true });

module.exports = mongoose.model('Incident', incidentSchema);
