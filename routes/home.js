
const { Router } = require('express');

const router = new Router()

router.get("/" , (req,res) => {
    res.render("index", {
        pageTitle : "NodeJS Weblog",
        path : "/"
    })
})


module.exports = router