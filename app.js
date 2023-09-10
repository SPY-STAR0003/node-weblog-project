const express = require('express');
const envConfig = require('dotenv').config({path : "./config/config.env"}); 
const morgen = require('morgan');
const layoutManager = require("express-ejs-layouts");

const statics = require('./utils/statics');
const middlewares = require("./utils/middlewares.js");
const connetDB = require("./config/db")

const homeRoute = require('./routes/home');
const adminRoute = require('./routes/admin');
const signRoute = require('./routes/sign');
const app = express();

// * connect to Database
connetDB()

// * logging
// app.use(morgen("dev"))

// * statics && middlewares
app.use(statics)
app.use(middlewares)

// * engines
// app.use(layoutManager)
// app.set('layout', './layouts/main/index');

app.set("view engine" , "ejs")
app.set("views", "views")

// * routes
app.use("/" ,homeRoute)
app.use('/admin', adminRoute)
app.use("/sign", signRoute)

// * 404
app.use("",(req,res) => {
    res.send("<h1>404</h1>")
})

// * listen to port 300
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server has been run in ${process.env.NODE_ENV} mode port ${PORT}`) 
})