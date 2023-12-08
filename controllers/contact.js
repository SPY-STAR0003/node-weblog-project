
const yup = require('yup');
const captchaPic = require('captchapng');
const {mailSender} = require('../utils/mailer');

let CAPTCHA_NUM;

exports.sendContact = async (req, res) => {

    // ! Captcha Deleted ! Add that in FrontEnd !
    const {name, email, massage} = req.body

    const schema = yup.object({
        name : yup.string().required(),
        email : yup.string().required().email(),
        massage : yup.string().required(),
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

            return res.status(200).json({
                errors : "Massage has been send!",
            })
        }
        
        console.log("Wrong Captcha!")

        res.status(400).json({
            errors : "Captcha is wrong"
        })
    } catch (err) {
        console.log(err)
        
        res.status(400).json({
            errors : "There is an error !",
            err
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