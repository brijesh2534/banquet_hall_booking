const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  // Link to the user who made the booking
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  eventType: { type: String, required: true },
  guestCount: { type: Number, required: true },
  packageType: { type: String, required: true },
  additionalServices: {
    type: [String], // An array of strings
    default: [],
  },
  message: { type: String },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', bookingSchema);