
const { Router } = require('express');

const router = new Router();
const user = require('../models/user');

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

    user.userValidation(req.body)
        .then(() => {
            res.redirect("/sign/in")
        })
        .catch((err) => {
            res.render("signUp", {
                pageTitle : "Sign Up for weblog",
                errors : err.errors,
                path : "/signUp"
            })
        })
})

module.exports = router