const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  meetingLink: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled'],
    default: 'scheduled',
  },
  recurrence: {
    type: {
      frequency: { type: String, enum: ['none', 'daily', 'weekly', 'monthly'], default: 'none' },
      interval: { type: Number, default: 1 }, // every n days/weeks/months
      count: { type: Number }, // total occurrences
      until: { type: Date }, // repeat until date
    },
    default: undefined,
  },
}, { timestamps: true });

module.exports = mongoose.model('Appointment', AppointmentSchema); 