const User = require("../models/User");//import user model
const bcrypt = require("bcrypt")

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


const authenticate = async (req, res, next) => {
    const {username, password} = req.body;

    if(username && password){
        try {
            const existing= await User.findOne({username});
            if(!existing){
                return res.status(404).json({ message: "Wrong Credentials" });
            }
    
            const comparePass = await bcrypt.compare(password, existing.password);
    
            if(!comparePass){
                return res.status(401).json({ message: "Wrong Password" });
            }
    
            const userid = existing._id;
            return res.status(200).json({username, userid });
            
    
        }catch(error){
            return res.status(500).json({message: error.message});
        }

    }else{
        return res.status(500).json({message: "Fill up the form"});
    }

    
}



exports.getusersbyid = getusersbyid; 
exports.authenticate = authenticate;