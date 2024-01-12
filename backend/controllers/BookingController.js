const Booking = require("../models/Booking");
const Spot = require("../models/Spots");

const postBooking =  async (req,res)=>{
    try {
        const { name, vehicleNumber, startDate, startTime, endTime, id } = req.body;
    
        // Validate input data (you can add more validation as needed)
    
        // Create a new Booking instance
        const newBooking = new Booking({
          name,
          vehicleNumber,
          startDate,
          startTime,
          endTime,
          spotid:id
        });
        
        const updatefields = {
          status: "Booked",
        }

        const spot = await Spot.findOneAndUpdate(
          {_id:id},
          updatefields,
          { new: true, runValidators: true }
          );
        // Save the new booking to the database
        const savedBooking = await newBooking.save();
    
        res.status(201).json({message: "Succesfully Booked"});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error, please try again later' });
      }
}


exports.postBooking = postBooking;