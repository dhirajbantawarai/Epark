// BookingModel.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  spotid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Spot', // Reference to the 'Spot' model
    required: true, // Optional: specify if it's required or not
  },
  totalprice:{
    type:Number
  }
}, { versionKey: false });

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;
