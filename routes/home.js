
const { Router } = require('express');
const {homePageController} = require('../controllers/home');

const router = new Router()

router.get("/" , homePageController)


module.exports = router