

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        trim : true
    },
    repeatPassword : {
        type : String,
        trim : true
    }
})

module.exports = mongoose.model("user", userSchema)