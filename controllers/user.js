const passport = require('passport');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { mailSender } = require('../utils/mailer');


exports.rememberMe = (req, res) => {
    if(req.body.remember) {
        req.session.cookie.originalMaxAge = 8640000
    } 

    res.redirect("/admin/dashboard")
}

exports.loginPost = async (req,res, next) => { 
    
    const {email, password} = req.body
    
    try {
        const user = await User.findOne({email})

        if(!user) {
            const err = new Error("There is no user with this info !")
            err.statusCode = 422;
            throw err;
        }

        const isEqual = await bcrypt.compare(password, user.password)
        
        if(isEqual) {
            const token = await jwt.sign({
                user : {
                    userId : user._id,
                    email : user.email,
                    name : user.name
                }
            }, process.env.JWT_SECRET)

            res.status(200).json({token})
        } else {
            const err = new Error("There is no user with this info !")
            err.statusCode = 422;
            throw err;
        }
    } catch (err) {
        next(err)
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