const mongoose = require('mongoose');

 const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    pic:{
        type: String,
        required: true,
        default:"https://www.shutterstock.com/image-photo/head-shot-portrait-close-smiling-600nw-1714666150.jpg"
    },
 },{timestamps : true});

 module.exports = mongoose.model("userCHAT",userSchema);