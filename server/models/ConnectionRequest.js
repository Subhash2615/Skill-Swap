const mongoose = require('mongoose');

const ConnectionRequestSchema = new mongoose.Schema({
  from: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  to: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected'], 
    default: 'pending' 
  },
  message: { 
    type: String, 
    default: 'I would like to connect with you for skill exchange!' 
  }
}, { timestamps: true });

// Prevent duplicate requests
ConnectionRequestSchema.index({ from: 1, to: 1 }, { unique: true });

module.exports = mongoose.model('ConnectionRequest', ConnectionRequestSchema); 