
const { Router } = require('express');

const router = new Router();
const {
    loginGetControl,
    registerPostControl,
    registerGetControl,
    loginPostControl,
    logOutControl,
    rememberMe
} = require('../controllers/user');
const { auth } = require('../middlewares/auth');

router.get("/login", loginGetControl)

router.post("/login", loginPostControl, rememberMe)

router.get("/register", registerGetControl)

router.post("/register", registerPostControl)

router.get("/logout", auth, logOutControl)

module.exports = router