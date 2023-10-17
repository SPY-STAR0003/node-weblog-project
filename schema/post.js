
const { default: mongoose } = require('mongoose');
const yup = require('yup');

const postYupSchema = yup.object({
    title : yup.string().required(),
    body : yup.string().required(),
})

const postSchemaProps = {
    title : {
        type : String,
        trim : true,
        required : true,
        minLength : 5,
        maxLength : 255
    },
    body : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "public",
        enum : ["public", "private"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
}

module.exports = {
    postSchemaProps,
    postYupSchema
}