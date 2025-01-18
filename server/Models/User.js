const mongoose = require("mongoose");

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
})

module.exports = mongoose.model("User", userSchema)