
const { Router } = require('express');
const {homePageController,postsController, handleSearch} = require('../controllers/home');

const router = new Router()

router.get("/" , homePageController)

router.get("/posts" , postsController)

router.post("/search", handleSearch)

module.exports = router