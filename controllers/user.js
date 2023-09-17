
const passport = require('passport');
const bcrypt = require('bcryptjs');

const user = require('../models/user');

const signInGetController = (req,res) => {
    res.render("signIn", {
        pageTitle : "sign in to weblog",
        path : '/signIn',
        message : req.flash('success_msg'),
        error : req.flash("error")
    })
}

const logOutController = (req,res,next) => {
    req.logout((err) => {
        if(err) return next(err)
        
        req.flash("success_msg", "Log Out! Successfully!");
        res.redirect("/sign/in");
    })
}

const rememberMe = (req, res) => {
    if(req.body.remember) {
        req.session.cookie.originalMaxAge = 8640000
    } 

    res.redirect("/user/dashboard")
}

const signInPostController = (req,res, next) => {
    passport.authenticate("local", {
        // successRedirect : "/user/dashboard",
        failureRedirect : "/sign/in",
        failureFlash : true,
    })(req, res, next)
}

const signUpPostController = async (req,res) => {

    user.userValidation(req.body)
        .then(async () => {
            const hash = await bcrypt.hash(req.body.password, 10)

            user.create({
                ...req.body,
                password : hash
            })
            .then(() => {
                req.flash("success_msg", `${req.body.name}! Your registering was successfull !`)
                res.redirect("/sign/in")
            })
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
    signUpGetController,
    signInPostController,
    logOutController,
    rememberMe
}