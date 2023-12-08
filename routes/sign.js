
const { Router } = require('express');

const router = new Router();
const controller = require('../controllers/user');
const { auth } = require('../middlewares/auth');


router.post("/login", controller.loginPost, controller.rememberMe)

router.post("/register", controller.registerPost)

router.get("/forget-password", controller.forgetPass)

router.post("/forget-password", controller.forgetPassPost)

router.get("/pass-rewinder/:token", controller.passRewinder)

router.post("/pass-modifier/:id", controller.passModifier)

module.exports = router