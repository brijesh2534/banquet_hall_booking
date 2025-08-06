const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST /api/contact
// @desc    Submit a new contact form inquiry
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please fill out all required fields.' });
  }

  try {
    const newInquiry = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newInquiry.save();

    res.status(201).json({ message: 'Thank you for your message! We will get back to you within 24 hours.' });

  } catch (err) {
    console.error('Contact form submission error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;