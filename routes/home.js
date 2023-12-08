
const { Router } = require('express');
const {homePageController,postsController} = require('../controllers/home');

const router = new Router()

router.get("/" , homePageController)

router.get("/posts/:id" , postsController)


module.exports = router