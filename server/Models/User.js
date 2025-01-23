const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please enter your name"],
    },
    email:{
        type: String,
        required:[true,"Please enter your Email"],

    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
        minLength: [4, "Password Should be greater than 4 characters"],
        select:false,
    },
    role:{
        type: String,
        default:"user",
    },
});

//jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRES,
    });
}

//compare password

userSchema.methods.comparePassword = async function(enteredPassword){
    
    return await bcrypt.compare(enteredPassword, this.password); //this.password i sthe password from db
}
module.exports = mongoose.model("User", userSchema)