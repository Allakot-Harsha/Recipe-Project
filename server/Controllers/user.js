const express = require("express");
const User = require("../Models/User");
const router  = express.Router();
const multer = require ("multer");
const ErrorHandler = require("../Utils/ErrorHandler");
const jwt = require("jsonwebtoken");
const sendMail = require("../Utils/sendMail");
const catchAsyncErrors = require("../Middlewares/catchAsyncErrors");
const bcrypt = require ("bcrypt");
const sendToken = require("../Utils/sendToken");

const upload = multer();
router.post("/create-user",upload.none(), async(req,res, next)=>{
    try{
        const {name, email, password} = req.body
        console.log(req.body);
        
        const userEmail = await User.findOne({email})
        if(userEmail){
            console.log("user already exists");
            return
            
        }
        const user ={
            name: name,
            email: email,
            password: password,
        }
        const activationToken = createActivationToken(user);
        // const newUser = await User.create(user);
        // res.status(201).json({success:true, newUser})
        
        const activationUrl = `http://localhost:5173/activation/${activationToken}`;
        // console.log(activationUrl);
        
        try{
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                message: `Hello ${user.name}, Please click the link to activate your account ${activationUrl}`,
            });
            res.status(201).json({
                success: true,
                message: `Please check your Email: ${user.email} to activate your Account`,
            })
        }

        catch(err){
            console.log(err);
            
        }
    }
    catch(error){
        return next(new ErrorHandler(error.message, 400))        ;
    }
});

router.post('/activation', catchAsyncErrors(async(req,res,next)=>{
    try{
        console.log("hihihihi");
        
        const {activation_token} = req.body;
        const newUser = jwt.verify(
            activation_token, 
            process.env.ACTIVATION_SECRET);
            if(!newUser){
                return next(new ErrorHandler("Invalid Token", 404));
            }
            const {name,email, password} = newUser;
            const existingUser = await User.findOne({email});
            if(existingUser){
                return next(new ErrorHandler("User already exits", 400))
            }
            
            
            try
            {
                const hashPassword = await bcrypt.hash(password,10)
                console.log(hashPassword);
                
                await User.create({name, email, password: hashPassword});
                
                

            }
            catch(error){
                console.log(error.message);
                
            }
            
            sendToken(newUser, 201, res);
    }
    catch(error){
        return next(new ErrorHandler(error.message, 400));
    }
}))

const createActivationToken = (user)=>{
    return jwt.sign(user, process.env.ACTIVATION_SECRET,{
        expiresIn: "5m",
    });
};

router.post("/login-user", catchAsyncErrors(async(req,res, next)=>{
    try{
        const {email, password} = req.body;
        console.log(req.body);
        
        if(!email|| !password){
            return next(new ErrorHandler(`Please provide all fields ${email , password}`, 400))
        }
        
        const user = await User.findOne({email}).select("+password"); // a select is given because it will not give you the password otherwise as it has select= false in the model
        // console.log(user);
        
        if(!user){
            
            return next(new ErrorHandler("Requested user not found", 400))
        }
        
        const isPasswordValid = await user.comparePassword(password)
        console.log(isPasswordValid);
        
        
        
        if(!isPasswordValid){            
            return next(new ErrorHandler("Invalid credentials", 400));
        }
        sendToken(user, 201, res);
    }
    catch(error){
        
        return next(new ErrorHandler(error.message, 500))
    }
}))

module.exports = router;