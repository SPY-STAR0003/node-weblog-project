
const { default: mongoose } = require('mongoose');
const yup = require('yup');

const postYupSchema = yup.object({
    title : yup.string()
        .required("title is a required field")
        .min("5", "Title should be more than 5 !")
        .max("255", "Title shouldn't be more than 255 !"),
    body : yup.string()
        .required("body is a required field"),
    status : yup.mixed()
        .oneOf(['public', 'private'], "status has to choose between public & private !"),
    thumbnail : yup.object().shape({
        name : yup.string().min(5).required(),
        size : yup.number().max(3000000),
        mimeType : yup.mixed()
            .oneOf(["image/png", "image/jpeg"], "Type should be between jpeg/png .")
    })
})

const postSchemaProps = {
    thumbnail : {
        type : String,
        required : true,
    },
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