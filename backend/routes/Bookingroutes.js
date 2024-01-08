const express = require("express");
const bookingrouter = express.Router();
const BookingController = require("../controllers/BookingController");

// bookingrouter.get("/:id",BookingController.getBooking);
bookingrouter.post("/",BookingController.postBooking);

module.exports = bookingrouter;