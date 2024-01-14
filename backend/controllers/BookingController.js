const Booking = require("../models/Booking");
const Spot = require("../models/Spots");

const postBooking =  async (req,res)=>{
    try {
        const { name, vehicleNumber, startDate, startTime, endTime, id, spotprice, spotid } = req.body;
    
        // Validate input data (you can add more validation as needed)
        //endtime("11:30 ") - starttime(12:30) * price
        //split the hours subtract end hour - start hour
        //convert result hours into minutes -> minutehours
        //split the minutes end minutes- start minutes
        //add minutehours + all minutes

        const perminuteprice = spotprice/60;

        const starthour = startTime.split(":")[0];
        const endhour = endTime.split(":")[0];
        const startminutes = startTime.split(":")[1];
        const endminutes = endTime.split(":")[1];

        const totalhours = endhour - starthour;
        const minutes = totalhours * 60;
        const totalminutes = (endminutes - startminutes) + minutes;

        let totalprice = 10;

        if(totalminutes>60){
          totalprice = perminuteprice * totalminutes; 
        }else{
          totalprice = 10;
        }

        if (totalprice < 0) {
      
          totalprice =  Math.ceil(totalprice);
        } else {
         
          totalprice=  totalprice % 1 < 0.5 ? Math.floor(totalprice) : Math.ceil(totalprice);
        }

        // Create a new Booking instance
        const newBooking = await new Booking({
          name,
          vehicleNumber,
          startDate,
          startTime,
          endTime,
          spotid,
          totalprice
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

const deletebooking = async (req, res) => {
  try {
    const spotIdToDelete = req.params.id;

    // Add logic to delete the spot by ID
    const deletedSpot = await Booking.findByIdAndDelete(spotIdToDelete);

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
const editBooking = async (req, res) => {
  try {
    const Bookingtoedit = req.params.id;
    let {
      name,
      vehicleNumber,
      startDate,
      startTime,
      endTime,
      spotid,totalprice} = req.body;;
    // Add logic to edit the spot by ID
    const updatedSpot = await Booking.findByIdAndUpdate(
      Bookingtoedit,
      { name,
        vehicleNumber,
        startDate,
        startTime,
        endTime,
        spotid,
        totalprice},
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
const getbookingByPage = async (req, res, next) => {
  const page = parseInt(req.params.page) || 1;
  const limit = 5; // Dynamically calculate the limit based on the page number

  try {
    const bookings = await Booking.find()
      .skip((page - 1) * limit)
      .limit(limit);
    return res.status(200).json({bookings });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


exports.deletebooking = deletebooking;
exports.getbookingByPage = getbookingByPage;
exports.editBooking = editBooking;
exports.postBooking = postBooking;