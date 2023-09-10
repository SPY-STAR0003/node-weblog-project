
const { Router } = require('express');

const router = new Router();

router.get("/dashboard", (req,res) => {
    res.render("dashboard", {
        pageTitle : "Dashboard",
        path : '/dashboard'
    })
})

module.exports = router