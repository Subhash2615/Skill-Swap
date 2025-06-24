const express = require('express');
const router = express.Router();
const User = require('../models/User');
const ConnectionRequest = require('../models/ConnectionRequest');
const { sendConnectionRequest } = require('../utils/emailService');
const auth = require('../middleware/authMiddleware');
const Appointment = require('../models/Appointment');

// GET /api/users/me
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/users/me
router.put('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    const { skills_to_teach, skills_to_learn } = req.body;
    if (skills_to_teach) user.skills_to_teach = skills_to_teach;
    if (skills_to_learn) user.skills_to_learn = skills_to_learn;
    
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/matches
router.get('/matches', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) return res.status(404).json({ message: 'User not found' });
    const matches = await User.find({
      _id: { $ne: currentUser._id },
      $or: [
        { skills_to_teach: { $in: currentUser.skills_to_learn } },
        { skills_to_learn: { $in: currentUser.skills_to_teach } },
      ],
    }).select('-password');
    res.json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/connect - Send connection request
router.post('/connect/:userId', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    const targetUser = await User.findById(req.params.userId);
    
    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (currentUser._id.equals(targetUser._id)) {
      return res.status(400).json({ message: 'Cannot connect with yourself' });
    }
    
    // Check if already connected
    if (currentUser.connections.includes(targetUser._id)) {
      return res.status(400).json({ message: 'Already connected' });
    }
    
    // Check if request already exists
    const existingRequest = await ConnectionRequest.findOne({
      from: currentUser._id,
      to: targetUser._id
    });
    
    if (existingRequest) {
      return res.status(400).json({ message: 'Connection request already sent' });
    }
    
    // Create connection request
    const connectionRequest = new ConnectionRequest({
      from: currentUser._id,
      to: targetUser._id,
      message: req.body.message || 'I would like to connect with you for skill exchange!'
    });
    
    await connectionRequest.save();
    
    // Send email notification
    const emailSent = await sendConnectionRequest(
      targetUser.email,
      currentUser.name,
      targetUser.name,
      connectionRequest._id
    );
    
    res.json({ 
      message: 'Connection request sent successfully!',
      emailSent: emailSent
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/requests - Get pending connection requests
router.get('/requests', auth, async (req, res) => {
  try {
    const requests = await ConnectionRequest.find({
      to: req.user.id,
      status: 'pending'
    }).populate('from', 'name email avatar bio');
    
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/requests/:requestId/accept - Accept connection request
router.post('/requests/:requestId/accept', auth, async (req, res) => {
  try {
    const request = await ConnectionRequest.findById(req.params.requestId);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    if (!request.to.equals(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }
    
    // Update request status
    request.status = 'accepted';
    await request.save();
    
    // Add to connections
    const fromUser = await User.findById(request.from);
    const toUser = await User.findById(request.to);
    
    fromUser.connections.push(request.to);
    toUser.connections.push(request.from);
    
    await fromUser.save();
    await toUser.save();
    
    res.json({ message: 'Connection request accepted!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/requests/:requestId/reject - Reject connection request
router.post('/requests/:requestId/reject', auth, async (req, res) => {
  try {
    const request = await ConnectionRequest.findById(req.params.requestId);
    
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    
    if (!request.to.equals(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    
    if (request.status !== 'pending') {
      return res.status(400).json({ message: 'Request already processed' });
    }
    
    // Update request status
    request.status = 'rejected';
    await request.save();
    
    res.json({ message: 'Connection request rejected' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/users/connections - List all users connected with me
router.get('/connections', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('connections', 'name email avatar bio skills_to_teach skills_to_learn');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.connections);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// APPOINTMENTS
// GET /api/users/appointments - List all appointments for the user
router.get('/appointments', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ participants: req.user.id })
      .populate('participants', 'name email avatar')
      .sort({ startTime: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/users/appointments - Create a new appointment
router.post('/appointments', auth, async (req, res) => {
  try {
    const { participantIds, meetingLink, title, description, startTime, endTime, recurrence } = req.body;
    if (!participantIds || !Array.isArray(participantIds) || participantIds.length === 0) {
      return res.status(400).json({ message: 'At least one participant is required' });
    }
    const appointment = new Appointment({
      participants: [req.user.id, ...participantIds],
      createdBy: req.user.id,
      meetingLink,
      title,
      description,
      startTime,
      endTime,
      recurrence,
    });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/users/appointments/:id - Update appointment status or details
router.patch('/appointments/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (!appointment.participants.includes(req.user.id)) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    // Allow updating status, meetingLink, title, description, startTime, endTime, recurrence
    const updatableFields = ['status', 'meetingLink', 'title', 'description', 'startTime', 'endTime', 'recurrence'];
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) appointment[field] = req.body[field];
    });
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/users/appointments/:id - Cancel/delete appointment
router.delete('/appointments/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });
    if (!appointment.createdBy.equals(req.user.id)) {
      return res.status(403).json({ message: 'Only the creator can delete the appointment' });
    }
    await appointment.deleteOne();
    res.json({ message: 'Appointment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;