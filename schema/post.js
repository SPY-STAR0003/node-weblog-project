

const { default: mongoose } = require('mongoose');
const yup = require('yup');

const postSchema = {
    title : {
        type : String,
        required : true,
        trim : true
    },
    body : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : "public",
        enum : ["public", "local"]
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    }
}

// const yupSchema = yup.object({
//     author : yup.string().required().trim().matches(/^[a-z]+$/, {
//         message : "You only can use elphebets !"
//     }),
//     text : yup.string().required().trim(),
//     date : yup.string().required(),
//     like : yup.number().required(),
// })

module.exports = {
    // yupSchema,
    postSchema
}