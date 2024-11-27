const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users= require('./User')


exports.register = async(req,res)=>{
    try{
    const {username, email,password}= req.body;
    // console.log(req.body); 
    
    
        // console.log(req.body); 
        const existingUser = await Users.findOne({email});
        if(existingUser) return res.status(400).json({msg: 'Email already exists'});
        console.log(`your are registered already ${email}`);
        const hashedPassword = await bcrypt.hash(password,12);
        const newUser = new Users({username, email, password:hashedPassword });
        // const newUser = new Users({username, email, password });
        console.log(hashedPassword);
    

        const savedUser= await newUser.save();
        console.log(savedUser);
        res.status(201).json({message:'User created successfully'});
        }catch(err){
            res.status(500).json({message:'Something went wrong'});
            }
};


exports.login = async (req , res)=>{
    try{
    const {email, password} = req.body;
    // console.log(req.body);
  
        const existingUser= await Users.findOne({email});
        if(!existingUser) return res.status(400).json({msg: 'user not found'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({ id: existingUser._id }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token, user: existingUser });
    } else {
      res.status(400).json({ msg: 'Invalid credentials' });
    }
  }catch(error){
        res.status(500).json({message:'Something went wrong'});
    }

};