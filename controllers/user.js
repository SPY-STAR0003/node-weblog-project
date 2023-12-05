const passport = require('passport');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const user = require('../models/user');
const { mailSender } = require('../utils/mailer');

exports.loginGet = (req,res) => {
    res.render("login", {
        pageTitle : "sign in to weblog",
        path : '/login',
        message : req.flash('success_msg'),
        error : req.flash("error")
    })
}

exports.logOut = (req,res,next) => {
    req.logout((err) => {
        if(err) return next(err)
        req.session = null
        // req.flash("success_msg", "Log Out! Successfully!");
        res.redirect("/user/login");
    })
}

exports.rememberMe = (req, res) => {
    if(req.body.remember) {
        req.session.cookie.originalMaxAge = 8640000
    } 

    res.redirect("/admin/dashboard")
}

exports.loginPost = async (req,res, next) => { 

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

exports.registerPost = async (req,res) => {

    const {name, email} = req.body

    user.userValidation(req.body)
        .then(async () => {
            const hash = await bcrypt.hash(req.body.password, 10)

            user.create({
                ...req.body,
                password : hash
            })
            .then(() => {
                mailSender(email, name, "Register Successful !", `Dear ${name} welcome to our home !`)
                req.flash("success_msg", `${req.body.name}! Your registering was successful !`)
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

exports.registerGet = (req,res) => {
    res.render("register", {
        pageTitle : "sign up to weblog",
        path : '/register'
    })
}

exports.forgetPass = (req, res) => {
    res.render("forgetPass", {
        pageTitle : "Remind Password",
        path : '/forget-password'
    })
}

exports.forgetPassPost = async (req, res) => {
    
    const foundedUser = await user.findOne({email : req.body.email})
    
    if(foundedUser === null) {
        return res.render("forgetPass", {
            pageTitle : "Remind Password",
            path : '/forget-password',
            msg : "There is no user with that name !"
        })
    }

    const token = jwt.sign({id : foundedUser._id}, process.env.JWT_SECRET, {expiresIn : '1h'})
    const resetLink = `http://rahatbekhun.ir/user/pass-rewinder/${token}`

    mailSender(
        foundedUser.email,
        foundedUser.name,
        "Let's Set a new Password !",
        `
            <h1> Let's set a new Password </h1>
            <p> Click on the below link : </p>
            <a href=${resetLink}> Set New Password </a>
        `
    )

    res.render("forgetPass", {
        pageTitle : "Remind Password",
        path : '/forget-password',
        msg : "Email reminder has been send !"
    })
}

exports.passRewinder = async (req, res) => {

    const token = req.params.token

    let decodedToken;

    try {
        decodedToken = await jwt.verify(token,process.env.JWT_SECRET)
    } catch (err) {
        console.log(err)
        return res.redirect("/404")
    }

    res.render("rewinder", {
        pageTitle : "Password Rewinder",
        path : "/pass-rewinder",
        userId : decodedToken.id
    })
}

exports.passModifier = async (req, res) => {

    let { password, repeatPassword } = req.body
    const { id } = req.params
    

    if(password !== repeatPassword) {

        req.flash("error" , "Password isn't like Repeat Password !")

        res.render("rewinder", {
            pageTitle : "Password Rewinder",
            path : "/pass-rewinder",
            errors : req.flash("error"),
            userId : id
        })
    }

    await bcrypt.hash(password, 10 , async (err, hash) => {
        try {
            await user.findByIdAndUpdate(id, {
                password : hash,
                repeatPassword : hash
            })
            res.redirect("/user/login")
        } catch (err) {
            console.log(err)
            res.redirect("/404")
        }
    })
}