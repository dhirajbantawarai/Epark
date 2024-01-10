const express = require("express");
const bookingrouter = express.Router();
const BookingController = require("../controllers/BookingController");
const SpotController = require("../controllers/SpotController");

// bookingrouter.get("/:id",BookingController.getBooking);
bookingrouter.post("/",BookingController.postBooking);
bookingrouter.get("/spots",SpotController.getallspot);

module.exports = bookingrouter;