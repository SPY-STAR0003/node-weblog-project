

const nodeMailer = require('nodemailer');
const transporter = require('nodemailer-smtp-transport');

const transportOptions = transporter({
    host : "mail.rahatbekhun.ir",
    secure : true,
    port : 465,
    auth : {
        user : "suggest@rahatbekhun.ir",
        pass: "Mz!201996716"
    },
    tls : {
        rejectUnauthorized : false
    }
})

exports.mailSender = (email, fullName, subject, text) => {

    const transport = nodeMailer.createTransport(transportOptions)

    const options = {
        from : "suggest@rahatbekhun.ir",
        to : email,
        subject,
        html : `
            <h1> Hello ${fullName} </h1>
            <p> ${text} </p>
        `
    }

    // console.log(options)
    
    transport.sendMail(options, (err, info) => {
        if(err) return console.log(err)
        console.log(info)
    })
}


