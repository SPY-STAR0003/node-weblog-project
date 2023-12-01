
const mongoose = require('mongoose')
const { postSchemaProps, postYupSchema } = require('../schema/post')

const postSchema = new mongoose.Schema(postSchemaProps)

postSchema.index({ title : "text"})

postSchema.statics.postValidation = function(body) {
    return postYupSchema.validate(body, {
        abortEarly : false
    })
}

module.exports = mongoose.model("post", postSchema)