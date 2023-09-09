
const { Router } = require('express');

const router = new Router();

router.get("/login", (req,res) => {
    res.render("login", {
        pageTitle : "sign in to weblog",
        path : '/login'
    })
})

router.get("/dashboard", (req,res) => {
    res.render("dashboard", {
        pageTitle : "Dashboard",
        path : '/dashboard'
    })
})

module.exports = router