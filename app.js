const express = require('express');

const statics = require('./utils/statics');
const middlewares = require("./utils/middlewares.js");
const { homeRoute } = require('./controllers/home');

const app = express();

// * statics && middlewares
app.use(statics)
app.use(middlewares)

// * engines
app.set("view engine" , "ejs")
app.set("views", "views")

// * routes
app.use("/" ,homeRoute)

// * 404
app.use("",(req,res) => {
    res.send("<h1>404</h1>")
})

// * listen to port 300
app.listen(3000, () => console.log("server has been run !"))