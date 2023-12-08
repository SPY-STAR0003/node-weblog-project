

const {Router} = require('express');

const { sendContact, captcha } = require('../controllers/contact');

const router = new Router()

router.post("/contact-us" , sendContact)

router.get("/captcha-pic", captcha)

module.exports = router