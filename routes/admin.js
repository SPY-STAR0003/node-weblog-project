
const { Router } = require('express');

const router = new Router();
const { auth } = require('../middlewares/auth');
const posts = require('../controllers/post');


router.get("/posts", auth, posts.getPosts)

router.put("/edit-post/:id", auth, posts.editPost)

router.delete("/delete-post/:id", auth, posts.deletePost)

router.post("/add-post", auth, posts.addPost)

router.post("/image-upload", auth, posts.upload)

router.put("/edit-post/:id", auth, posts.sendEditedPost)


module.exports = router