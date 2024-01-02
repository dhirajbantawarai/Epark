const User = require("../models/User");//import user model

const getusersbyid = async (req,res, next)=>{
    const id = req.params.id;
    let user;
    
    try {
        user = await User.findOne({_id:id});
        //book = await Book.findId(id);
    } catch (error) {
        console.log(error);
    }

    if(!user){
        return res.status(404).json({message:"no user found"});
    }
    return res.status(200).json({user:user});

};

exports.getusersbyid = getusersbyid; 