const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  dateBooked: { type: Date, default: Date.now },
  guests: { type: Number, required: true, min: [1, 'At least one guest required'] },
  totalPrice: { type: Number, required: true, min: [0, 'totalPrice must be >= 0'] }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
