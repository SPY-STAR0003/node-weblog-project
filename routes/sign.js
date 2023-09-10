
const { Router } = require('express');

const router = new Router();
const yup = require('yup');
const url = require('url');

const userSchema = yup.object({
    name : yup.string().required().trim().matches(/^[a-z]+$/, {
        message : "You only can use elphebets !"
    }),
    email : yup.string().email().required().trim(),
    password : yup.string().required(),
    repeatPassword : yup.string().required().oneOf([yup.ref("password"), null], "password most be match !")
})

router.get("/in", (req,res) => {
    res.render("signIn", {
        pageTitle : "sign in to weblog",
        path : '/signIn'
    })
})

router.get("/up", (req,res) => {
    res.render("signUp", {
        pageTitle : "sign up to weblog",
        path : '/signUp'
    })
})

router.post("/up", (req,res) => {

    userSchema.validate(req.body)
        .then((user) => (
            res.redirect("/sign/in")
        ))
        .catch((e) => {
            res.render("signUp", {
                pageTitle : "sign up for weblog",
                path : "/signUp",
                errors : e.errors
            })
        })
})

module.exports = router