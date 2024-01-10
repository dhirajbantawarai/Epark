const Spot = require("../models/Spots");
const { find } = require("../models/User");

const getallspot =  async (req,res)=>{
    try {
    
        const spot = await Spot.find({});
    
        if(!spot){
            res.status(200).json({message: "NO spots available"});
        }
        res.status(200).json({spot});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error, please try again later' });
      }
}

exports.getallspot = getallspot;