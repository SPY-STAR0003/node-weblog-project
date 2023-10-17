
const { Router } = require('express');

const router = new Router();
const { auth } = require('../middlewares/auth');
const posts = require('../controllers/post');

router.get("/dashboard", auth, posts.dashboard)

router.get("/posts", auth, posts.getPosts)

router.get("/add-post", auth, posts.showAddPostForm)

router.post("/add-post", auth, posts.addPost)

module.exports = router