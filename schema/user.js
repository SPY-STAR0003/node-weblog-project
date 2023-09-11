const yup = require('yup');

const userSchemaProps = {
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
}

const yupSchema = yup.object({
    name : yup.string().required().trim().matches(/^[a-z]+$/, {
        message : "You only can use elphebets !"
    }),
    email : yup.string().email().required().trim(),
    password : yup.string().required(),
    repeatPassword : yup.string().required()
    .oneOf([yup.ref("password"), null], "password most be match !")
})


module.exports = {
    yupSchema,
    userSchemaProps
}