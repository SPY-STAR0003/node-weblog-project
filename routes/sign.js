
const { Router } = require('express');

const router = new Router();
const { signInGetController, signUpGetController, signUpPostController } = require('../controllers/user');

router.get("/in", signInGetController)

router.get("/up", signUpGetController)

router.post("/up", signUpPostController)

module.exports = router