
const { Router } = require('express');

const router = new Router();

const loginRoute = router.get("/", (req,res) => {
    res.render("login", {
        pageTitle : "ورود به بخش مدیریت",
        path : '/login'
    })
})

module.exports = loginRoute;