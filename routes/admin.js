
const { Router } = require('express');

const router = new Router();
const { auth } = require('../middlewares/auth');

router.get("/dashboard", auth, (req,res) => {
    res.render("dashboard", {
        pageTitle : "Dashboard",
        path : '/dashboard',
        fullname : req.user.name
    })
})

module.exports = router