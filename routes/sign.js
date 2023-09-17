
const { Router } = require('express');

const router = new Router();
const { signInGetController, signUpGetController, signUpPostController, signInPostController, logOutController, rememberMe } = require('../controllers/user');
const { auth } = require('../middlewares/auth');

router.get("/in", signInGetController)

router.post("/in", signInPostController, rememberMe)

router.get("/up", signUpGetController)

router.post("/up", signUpPostController)

router.get("/out", auth, logOutController)

module.exports = router