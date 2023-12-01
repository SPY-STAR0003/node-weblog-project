
const { Router } = require('express');

const router = new Router();
const { auth } = require('../middlewares/auth');
const posts = require('../controllers/post');

router.get("/dashboard", auth, posts.dashboard)

router.get("/posts", auth, posts.getPosts)

router.get("/add-post", auth, posts.showAddPostForm)

router.get("/edit-post/:id", auth, posts.editPost)

router.get("/delete-post/:id", auth, posts.deletePost)

router.post("/add-post", auth, posts.addPost)

router.post("/image-upload", auth, posts.upload)

router.post("/edit-post/:id", auth, posts.sendEditedPost)


module.exports = router