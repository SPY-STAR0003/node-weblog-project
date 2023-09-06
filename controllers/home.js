
const app = require('express')();

const homeRoute = app.get("/" , (req,res) => {
    res.render("index", {
        pageTitle : "وبلاگ آزمایشی نود جی اس"
    })
})


module.exports = {
    homeRoute
}