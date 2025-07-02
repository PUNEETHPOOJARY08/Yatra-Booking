const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bus', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// --- Booking Model ---
const bookingSchema = new mongoose.Schema({
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
const Booking = mongoose.model('Booking', bookingSchema);



// --- Booking Route ---
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: 'Booking saved', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error saving booking', error: err });
  }
});

app.get('/api/bookings', async (req, res) => {
  try {
    // You can filter by passengerEmail or userId if you want user-specific bookings
    const { passengerEmail } = req.query;
    let query = {};
    if (passengerEmail) {
      query.passengerEmail = passengerEmail;
    }
    const bookings = await Booking.find(query);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err });
  }
});

app.patch('/api/bookings/:id/cancel', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { 'payment.status': 'cancelled' },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking cancelled. Amount will be refunded.', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling booking', error: err });
  }
});

app.patch('/api/bookings/:id/edit', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking updated successfully.', booking });
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err });
  }
});
app.listen(5000, () => console.log('Server running on port 5000'));