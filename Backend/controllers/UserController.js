const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '3d',
  });
};

const RegisterUser = async (req, res) => {
  try {
    const { username, email, password,isAnonymous } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      isAnonymous:isAnonymous,
      followedReports:[],
    });

    await user.save();

    const token = createToken(user._id);

    res.status(201).json({
      success: true, 
      message: "User Created Successfully",
      token,
      user:{
        id:user._id,
        username:user.username,
        email:user.email,
        isAnonymous:user.isAnonymous,
        role:user.role,
      }
    });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({
      message: err.message,

    });
  }
};


const LoginUser=async(req,res)=>{

   const {email,password}=req.body;

     if ( !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const user=await User.findOne({email});

    if(!user){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    const token = createToken(user._id);

    res.status(200).json({
      success: true,
        message:"Login Successfully",
        token,
     user:{
        id:user._id,
        username:user.username,
        email:user.email,
        isAnonymous:user.isAnonymous,
       role:user.role,
      }
        
    })

}












module.exports = { RegisterUser,LoginUser };
