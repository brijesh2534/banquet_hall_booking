const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth'); // Import our auth middleware

// @route   POST /api/booking
// @desc    Create a new event booking
// @access  Private (requires login)
router.post('/', auth, async (req, res) => {
  const {
    name,
    email,
    phone,
    eventDate,
    eventTime,
    eventType,
    guestCount,
    packageType,
    additionalServices,
    message,
  } = req.body;

  // Basic validation
  if (!name || !email || !phone || !eventDate || !eventTime || !eventType || !guestCount || !packageType) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  try {
    const newBooking = new Booking({
      user: req.user.id, // Get user ID from the token via auth middleware
      name,
      email,
      phone,
      eventDate,
      eventTime,
      eventType,
      guestCount,
      packageType,
      additionalServices,
      message,
    });

    const booking = await newBooking.save();

    res.status(201).json({
      message: 'Booking request submitted successfully! We will contact you within 24 hours to confirm the details.',
      booking,
    });

  } catch (err) {
    console.error('Booking submission error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;