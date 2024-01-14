const express = require("express");
const bookingrouter = express.Router();
const BookingController = require("../controllers/BookingController");
const SpotController = require("../controllers/SpotController");

// bookingrouter.get("/:id",BookingController.getBooking);
bookingrouter.post("/",BookingController.postBooking);
bookingrouter.get("/spots",SpotController.getallspot);
bookingrouter.post("/addspot",SpotController.createspot);
bookingrouter.delete("/deletespot/:id",SpotController.deleteSpot);
bookingrouter.put("/editspot/:id",SpotController.editspot);
bookingrouter.get("/:page",BookingController.getbookingByPage);
bookingrouter.put("/update/:id",BookingController.editBooking);
bookingrouter.delete("/delete/:id",BookingController.deletebooking);
module.exports = bookingrouter;