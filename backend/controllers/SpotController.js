const Spot = require("../models/Spots");
const Booking = require("../models/Booking");
const { mongoose } = require("mongoose");


const getallspot =  async (req,res)=>{
    try {
    
        const spots = await Spot.find({});
        const ObjectId = mongoose.Types.ObjectId;

        await Promise.all(spots.map(async (spot) => {
          try {
            let {_id, status} = spot;

            if(status !=="Reserved"){        
              const booking = await Booking.findOne({ spotid:_id });
              if (booking) {
                const currdate = new Date();
                const { startDate, endTime } = booking;
                const enddate = `${startDate.toISOString().split('T')[0]}`;
                const endDateTime = new Date(`${enddate} ${endTime}`);
        
        
                if (currdate > endDateTime && booking.status === "Booked") {
                  const updatefields = {
                    status: "Available"
                  }
                  const updatedspots = await Spot.findOneAndUpdate({_id: _id},
                    updatefields,
                    { new: true, runValidators: true }
                    )
                }
              }
            }
            // _id = new ObjectId(_id);
          } catch (error) {
            console.error(error);
            // Handle errors appropriately
          }
        }));

    
        if(!spots){
            res.status(200).json({message: "NO spots available"});
        }
        res.status(200).json({spots});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error, please try again later' });
      }
}

exports.getallspot = getallspot;