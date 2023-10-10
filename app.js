const express = require('express');
const envConfig = require('dotenv').config({path : "./config/config.env"}); 
const morgan = require('morgan');
const layoutManager = require("express-ejs-layouts");
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const debug = require('debug')("web");
const parser = require('body-parser');

const statics = require('./utils/statics');
const middlewares = require("./utils/middlewares.js");
const connetDB = require("./config/db");
const winston = require('./config/winston');

const homeRoute = require('./routes/home');
const adminRoute = require('./routes/admin');
const signRoute = require('./routes/sign');
const passport = require('passport');
const app = express();

// * connect to Database
connetDB()

require('./config/passport');

app.use(parser.urlencoded({extended : false}))

// * logging
// if(process.env.NODE_ENV === "development") {
//     debug("morgan is working correctly ", { stream : winston.stream })
//     app.use(morgan("tiny"))
// }

// * statics && middlewares
app.use(statics)
app.use(middlewares)
app.use(session({
    secret : "secret",
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({
        mongoUrl : process.env.MONGODB_URL
    })
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

// * engines
// app.use(layoutManager)
// app.set('layout', './layouts/main/index');

app.set("view engine" , "ejs")
app.set("views", "views")

// * routes
app.use("/" ,homeRoute)
app.use('/admin', adminRoute)
app.use("/user", signRoute)

// * 404
app.use("",(req,res) => {
    res.send("<h1>404</h1>")
})

// * listen to port 300
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server has been run in ${process.env.NODE_ENV} mode port ${PORT}`) 
})