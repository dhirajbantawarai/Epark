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
const deletespot = async (req, res) => {
  try {
    const spotIdToDelete = req.params.id;

    // Add logic to delete the spot by ID
    const deletedSpot = await Spot.findByIdAndDelete(spotIdToDelete);

    if (!deletedSpot) {
      return res.status(404).json({ message: "Spot not found" });
    }

    return res.status(200).json({ message: "Spot deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error, please try again later",
    });
  }
};

const createspot = async (req, res) => {
  try {
    const {price, status} = req.body;

    // Add logic to create a new spot
    const newSpot = await Spot.create({
      price,
      status
    });

    return res.status(201).json({ message: "Spot created successfully", newSpot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error, please try again later",
    });
  }
};
const editspot = async (req, res) => {
  try {
    const spotIdToEdit = req.params.id;
    let {price, status} = req.body;
    price = Number(price);
    // Add logic to edit the spot by ID
    const updatedSpot = await Spot.findByIdAndUpdate(
      spotIdToEdit,
      { price, status },
      { new: true, runValidators: true }
    );

    if (!updatedSpot) {
      return res.status(404).json({ message: "Spot not found" });
    }

    return res.status(200).json({ message: "Spot edited successfully", updatedSpot });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error, please try again later",
    });
  }
};

exports.getallspot = getallspot;
exports.deleteSpot = deletespot;
exports.createspot = createspot;
exports.editspot = editspot;
