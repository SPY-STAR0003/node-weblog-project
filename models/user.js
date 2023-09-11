

const mongoose = require('mongoose');
const yup = require('yup');

const yupSchema = yup.object({
    name : yup.string().required().trim().matches(/^[a-z]+$/, {
        message : "You only can use elphebets !"
    }),
    email : yup.string().email().required().trim(),
    password : yup.string().required(),
    repeatPassword : yup.string().required()
    .oneOf([yup.ref("password"), null], "password most be match !")
})

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

userSchema.statics.userValidation = function(body) {
    return yupSchema.validate(body, {
        abortEarly : false,
    })
}

module.exports = mongoose.model("user", userSchema)