const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // or use passengerEmail if you don't have userId
  busId: String,
  busName: String,
  seats: [String],
  totalFare: Number,
  passengerName: String,
  passengerEmail: String,
  passengerPhone: String,
  passengerAddress: String,
  bookingDate: String,
  journeyDate: String,
  source: String,
  destination: String,
  payment: Object,
});

module.exports = mongoose.model('Booking', BookingSchema);