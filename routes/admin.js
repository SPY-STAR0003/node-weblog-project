
const { Router } = require('express');

const router = new Router();
const { auth } = require('../middlewares/auth');

router.get("/dashboard", auth, (req,res) => {
    res.render("dashboard", {
        pageTitle : "Dashboard",
        path : '/dashboard',
        page : "/dashboard",
        fullName : req.user.name,
    })
})

router.get("/posts", auth, (req,res) => {
    res.render("dashboard", {
        pageTitle : `${req.user.name} posts`,
        path : '/dashboard',
        page : "/posts",
        fullName : req.user.name,
    })
})

router.get("/add-post", auth, (req,res) => {
    res.render("dashboard", {
        pageTitle : `Add Post`,
        path : '/dashboard',
        page : "/add-post",
        fullName : req.user.name,
    })
})

module.exports = router