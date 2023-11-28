
const { Router } = require('express');

const router = new Router();
const controller = require('../controllers/user');
const { auth } = require('../middlewares/auth');

router.get("/login", controller.loginGet)

router.post("/login", controller.loginPost, controller.rememberMe)

router.get("/register", controller.registerGet)

router.post("/register", controller.registerPost)

router.get("/logout", auth, controller.logOut)

router.get("/forget-password", controller.forgetPass)

router.post("/forget-password", controller.forgetPassPost)

router.get("/pass-rewinder", controller.passRewinder)

module.exports = router