
const user = require('../models/user');
const bcrypt = require('bcryptjs');

const signInGetController = (req,res) => {
    res.render("signIn", {
        pageTitle : "sign in to weblog",
        path : '/signIn'
    })
}

const signUpPostController = async (req,res) => {

    user.userValidation(req.body)
        .then(async () => {
            const hash = await bcrypt.hash(req.body.password, 10)

            user.create({
                ...req.body,
                password : hash
            })
            .then(() => res.redirect("/sign/in"))
            .catch((err) => {
                err.message.includes("E11000") && res.render("signUp", {
                    pageTitle : "Sign Up for weblog",
                    errors : ["This email has been used before !"],
                    path : "/signUp"
                })
            })
        })
        .catch((err) => {
            res.render("signUp", {
                pageTitle : "Sign Up for weblog",
                errors : err.errors,
                path : "/signUp"
            })
        })
}

const signUpGetController = (req,res) => {
    res.render("signUp", {
        pageTitle : "sign up to weblog",
        path : '/signUp'
    })
}

module.exports = {
    signInGetController,
    signUpPostController,
    signUpGetController
}