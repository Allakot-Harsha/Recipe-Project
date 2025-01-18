const express = require("express");
const User = require("../Models/User");
const router  = express.Router();
const multer = require ("multer")

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
        const newUser = await User.create(user);
        res.status(201).json({success:true, newUser})
    }
    catch(error){
        console.log(error);
        
    }
})
module.exports = router;