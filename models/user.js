
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { yupSchema, userSchemaProps } = require('../schema/user');

const userSchema = new mongoose.Schema(userSchemaProps)

userSchema.statics.userValidation = function(body) {
    return yupSchema.validate(body, {
        abortEarly : false,
    })
}

module.exports = mongoose.model("user", userSchema)