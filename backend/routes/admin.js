const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Import all necessary models
const User = require('../models/User');
const Contact = require('../models/Contact');
const Booking = require('../models/Booking');
const GalleryImage = require('../models/GalleryImage');
const adminAuth = require('../middleware/adminAuth');

// --- Multer Setup for File Uploads ---
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    // Create a unique filename to prevent overwriting: fieldname-timestamp.extension
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // Limit file size to 5MB
  fileFilter: function(req, file, cb) {
    // Allowed file types check
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: You can only upload image files (jpeg, jpg, png, gif).');
    }
  }
}).single('galleryImage'); // 'galleryImage' is the name of the HTML form field

// @route   POST /api/admin/login
// @desc    Admin login
// @access  Public
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    const payload = { admin: { id: 'admin_user', role: 'admin' } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } else {
    res.status(400).json({ message: 'Invalid Credentials' });
  }
});

// @route   POST /api/admin/upload
// @desc    Upload an image file for the gallery
// @access  Private (Admin only)
router.post('/upload', adminAuth, (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    if (req.file == undefined) {
      return res.status(400).json({ message: 'Error: No file selected!' });
    }
    // If upload is successful, return the public path to the file
    res.json({
      message: 'File uploaded successfully',
      filePath: `/uploads/${req.file.filename}`
    });
  });
});

// --- User Management ---
router.get('/users', adminAuth, async (req, res) => { try { const users = await User.find().select('-password').sort({ createdAt: -1 }); res.json(users); } catch (err) { res.status(500).send('Server Error'); } });
router.delete('/users/:id', adminAuth, async (req, res) => { try { await User.findByIdAndDelete(req.params.id); res.json({ message: 'User deleted successfully' }); } catch (err) { res.status(500).send('Server Error'); } });
router.put('/users/:id', adminAuth, async (req, res) => { try { const u = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password'); res.json({ message: 'User updated successfully', data: u }); } catch (err) { res.status(500).send('Server Error'); } });

// --- Contact Management ---
router.get('/contacts', adminAuth, async (req, res) => { try { const contacts = await Contact.find().sort({ submittedAt: -1 }); res.json(contacts); } catch (err) { res.status(500).send('Server Error'); } });
router.delete('/contacts/:id', adminAuth, async (req, res) => { try { await Contact.findByIdAndDelete(req.params.id); res.json({ message: 'Contact inquiry deleted successfully' }); } catch (err) { res.status(500).send('Server Error'); } });
router.put('/contacts/:id', adminAuth, async (req, res) => { try { const c = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ message: 'Contact updated successfully', data: c }); } catch (err) { res.status(500).send('Server Error'); } });

// --- Booking Management ---
router.get('/bookings', adminAuth, async (req, res) => { try { const bookings = await Booking.find().populate('user', 'fullName email').sort({ bookingDate: -1 }); res.json(bookings); } catch (err) { res.status(500).send('Server Error'); } });
router.delete('/bookings/:id', adminAuth, async (req, res) => { try { await Booking.findByIdAndDelete(req.params.id); res.json({ message: 'Booking deleted successfully' }); } catch (err) { res.status(500).send('Server Error'); } });
router.put('/bookings/:id', adminAuth, async (req, res) => { try { const b = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true }); res.json({ message: 'Booking updated successfully', data: b }); } catch (err) { res.status(500).send('Server Error'); } });

// --- Gallery Management (Database Operations) ---
router.get('/gallery', adminAuth, async (req, res) => { try { const images = await GalleryImage.find().sort({ createdAt: -1 }); res.json(images); } catch (err) { res.status(500).send('Server Error'); } });
router.post('/gallery', adminAuth, async (req, res) => { const { src, alt, category } = req.body; if (!src || !alt || !category) { return res.status(400).json({ message: 'Image URL, Alt Text, and Category are required.' }); } try { const newImage = new GalleryImage({ src, alt, category }); await newImage.save(); res.status(201).json({ message: 'Image details saved successfully', data: newImage }); } catch (err) { res.status(500).send('Server Error'); } });
router.put('/gallery/:id', adminAuth, async (req, res) => { try { const i = await GalleryImage.findByIdAndUpdate(req.params.id, req.body, { new: true }); if (!i) return res.status(404).json({ message: 'Image not found' }); res.json({ message: 'Image updated successfully', data: i }); } catch (err) { res.status(500).send('Server Error'); } });
router.delete('/gallery/:id', adminAuth, async (req, res) => { try { const i = await GalleryImage.findByIdAndDelete(req.params.id); if (!i) return res.status(404).json({ message: 'Image not found' }); res.json({ message: 'Image deleted successfully' }); } catch (err) { res.status(500).send('Server Error'); } });

module.exports = router;
