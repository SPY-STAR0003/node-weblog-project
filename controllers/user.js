const passport = require('passport');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const user = require('../models/user');

const loginGetControl = (req,res) => {
    res.render("login", {
        pageTitle : "sign in to weblog",
        path : '/login',
        message : req.flash('success_msg'),
        error : req.flash("error")
    })
}

const logOutControl = (req,res,next) => {
    req.logout((err) => {
        if(err) return next(err)
        
        req.flash("success_msg", "Log Out! Successfully!");
        res.redirect("/user/login");
    })
}

const rememberMe = (req, res) => {
    if(req.body.remember) {
        req.session.cookie.originalMaxAge = 8640000
    } 

    res.redirect("/admin/dashboard")
}

const loginPostControl = async (req,res, next) => { 

    if(!req.body['g-recaptcha-response']) {
        req.flash("error", "You should accept captcha")
        return res.redirect("/user/login")
    }

    const postUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_KEY}&response=${req.body['g-recaptcha-response']}`

    try {
        await axios.post(postUrl)
        passport.authenticate("local", {
            failureRedirect : "/user/login",
            failureFlash : true,
        })(req, res, next)
    } catch (error) {
        req.flash("error", "Try Again !")
        res.redirect("/user/login")
    }

}

const registerPostControl = async (req,res) => {

    user.userValidation(req.body)
        .then(async () => {
            const hash = await bcrypt.hash(req.body.password, 10)

            user.create({
                ...req.body,
                password : hash
            })
            .then(() => {
                req.flash("success_msg", `${req.body.name}! Your registering was successfull !`)
                res.redirect("/user/login")
            })
            .catch((err) => {
                err.message.includes("E11000") && res.render("register", {
                    pageTitle : "Sign Up for weblog",
                    errors : ["This email has been used before !"],
                    path : "/register"
                })
            })
        })
        .catch((err) => {
            res.render("register", {
                pageTitle : "Sign Up for weblog",
                errors : err.errors,
                path : "/register"
            })
        })
}

const registerGetControl = (req,res) => {
    res.render("register", {
        pageTitle : "sign up to weblog",
        path : '/register'
    })
}

module.exports = {
    loginGetControl,
    registerPostControl,
    registerGetControl,
    loginPostControl,
    logOutControl,
    rememberMe
}