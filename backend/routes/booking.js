// filepath: c:\Users\prana\Downloads\project\project\backend\routes\booking.js
const express = require('express');
const Booking = require('../models/Booking');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking saved', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error saving booking', error: err });
  }
});

module.exports = router;