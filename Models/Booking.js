const mongoose = require("mongoose");

const Bookings = new mongoose.Schema({
  hotel_id: Number,
  booking_date: Date,
  booking_start: Date,
  booking_end: Date,
  user_id: Number,
});

const Booking = mongoose.model("Booking", Bookings);
module.exports = Booking;
