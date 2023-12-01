
const yup = require('yup');
const captchaPic = require('captchapng');
const {mailSender} = require('../utils/mailer');

let CAPTCHA_NUM;

exports.contact = (req, res) => {
    res.render("./pages/contact", {
        pageTitle : "Contact Us",
        path : "/login",
        errors : req.flash("error")
    })
}

exports.sendContact = async (req, res) => {

    const {name, email, massage, captcha} = req.body

    const schema = yup.object({
        name : yup.string().required(),
        email : yup.string().required().email(),
        massage : yup.string().required(),
        captcha : yup.string().required()
    })

    try {
        await schema.validate(req.body, {
            abortEarly : false
        })

        if(Number(CAPTCHA_NUM) === Number(captcha)) {
            mailSender(email, name, "Contact-us", `
                <h2>${massage}</h2>
                <h4>How that send you email :  ${email} </h4>
            `)

            console.log("Email has been Sent !")

            req.flash("error", "Massage has been sent!")

            return res.render("./pages/contact", {
                pageTitle : "Contact Us",
                path : "/login",
                errors : req.flash("error")
            })
        }

        req.flash("error", "Captcha is wrong !")

        console.log("Wrong Captcha!")

        res.render("./pages/contact", {
            pageTitle : "Contact Us",
            path : "/login",
            errors : req.flash("error")
        })
    } catch (err) {
        res.render("./pages/contact", {
            pageTitle : "Contact Us",
            path : "/login",
            errors : err.errors
        })
    }
}

exports.captcha = async (req, res) => {

    CAPTCHA_NUM = Math.floor(Math.random()*9000+1000)

    const pic = new captchaPic(100,50,CAPTCHA_NUM)
    pic.color(0,0,0,0)
    pic.color(80,80,80,255)

    let img = pic.getBase64();
    let imgBase64 = new Buffer.from(img,'base64');

    res.send(imgBase64);
}