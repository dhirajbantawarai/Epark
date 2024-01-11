const User = require("../models/User");//import user model
const bcrypt = require("bcrypt")

const getusersbyid = async (req,res, next)=>{
    const id = req.params.id;
    let user;

    const projection ={
        password: 0,
    }
    
    try {
        user = await User.findOne({_id:id},projection);
        //book = await Book.findId(id);
    } catch (error) {
        console.log(error);
    }

    if(!user){
        return res.status(404).json({message:"no user found"});
    }
    return res.status(200).json({user:user});

};

const checkanswer = async (req, res, next) => {
    const id = req.params.id;
    const reqanswer = req.body.answer;
    const password = req.body.password || null;  // Default to null if password is not provided

    try {
        const user = await User.findOne({ _id: id }, { answer: 1 });

        if (!user) {
            return res.status(404).json({ message: "No user found" });
        }

        if (!password || password.length < 4) {
            return res.status(400).json({ message: "Password is required and must be at least 4 characters long" });
        }

        if (!reqanswer) {
            return res.status(401).json({ message: "Answer is required" });
        }

        if (user.answer === reqanswer) {
            let updateFields = {
                password,
            };

            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;

            const updatedUser = await User.findOneAndUpdate(
                { _id: id },
                updateFields,
                { new: true, runValidators: true }
            );

            if (updatedUser) {
                return res.status(200).json({ message: "Successfully Changed Password" });
            }
        } else {
            return res.status(401).json({ message: "Answer Not Matched" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getusersbymail = async (req,res, next)=>{
    const mail = req.params.mail;
    let user;

    const projection ={
        password: 0,
        answer:0
    }
    
    try {
        user = await User.findOne({email:mail},projection);
        //book = await Book.findId(id);
    } catch (error) {
        console.log(error);
    }

    if(!user){
        return res.status(404).json({message:"no user found"});
    }
    return res.status(200).json({user:user});

};
const createuser = async(req,res)=>{
    try {
        // Extract data from the request body
        const { username, email, password, phone } = req.body;

        const hashedpass = await bcrypt.hash(password,10);
    
        // Perform any necessary validation on the input data
    
        // Here, you would typically hash the password before saving it to the database
        // For simplicity, I'm assuming you have a User model with a create method
        const newUser = await User.create({
          username,
          email,
          password: hashedpass, 
          phone// Remember to hash the password before storing it in a production environment
        });
    
        // Respond with the created user
        res.status(201).json({
          message: 'User created successfully',
          user: newUser,
        });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
          message: 'Internal Server Error',
        });
      }
}

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
exports.createuser = createuser;
exports.getusersbymail = getusersbymail;
exports.checkanswer = checkanswer;