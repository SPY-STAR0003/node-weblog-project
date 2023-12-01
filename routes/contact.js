

const {Router} = require('express');

const { contact, sendContact, captcha } = require('../controllers/contact');

const router = new Router()


router.get("/contact-us" , contact)

router.post("/contact-us" , sendContact)

router.get("/captcha-pic", captcha)

module.exports = router