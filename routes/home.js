
const { Router } = require('express');

const router = new Router()

const homeRoute = router.get("/" , (req,res) => {
    res.render("index", {
        pageTitle : "وبلاگ آزمایشی نود جی اس"
    })
})


module.exports = router