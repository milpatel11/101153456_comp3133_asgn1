const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Hotels",
  new mongoose.Schema({
    hotel_name: String,
    street: String,
    city: String,
    postal_code: String,
    price: Number,
    email: String,
    user_id: Number,
  })
);
