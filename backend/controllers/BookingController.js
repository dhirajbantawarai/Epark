const Booking = require("../models/Booking");

const postBooking =  async (req,res)=>{
    try {
        const { name, vehicleNumber, startDate, startTime, endTime } = req.body;
    
        // Validate input data (you can add more validation as needed)
    
        // Create a new Booking instance
        const newBooking = new Booking({
          name,
          vehicleNumber,
          startDate,
          startTime,
          endTime,
        });
    
        // Save the new booking to the database
        const savedBooking = await newBooking.save();
    
        res.status(201).json({message: "Succesfully Booked"});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error, please try again later' });
      }
}

exports.postBooking = postBooking;