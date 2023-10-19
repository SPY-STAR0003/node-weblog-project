
const { default: mongoose } = require('mongoose');
const yup = require('yup');

const postYupSchema = yup.object({
    title : yup.string()
        .required("title is a required field")
        .min("5", "Title should be more than 5 !")
        .max("255", "Title shouldn't be more than 255 !"),
    body : yup.string()
        .required("body is a required field"),
    status : yup.mixed().oneOf(['public', 'private'])
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