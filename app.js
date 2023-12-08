const express = require('express');
const envConfig = require('dotenv').config({path : "./config/config.env"}); 
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require('connect-mongo');
const parser = require('body-parser');
const fileUploader = require('express-fileupload');

const statics = require('./utils/statics');
const connectDB = require("./config/db");
const passport = require('passport');

const homeRoute = require('./routes/home');
const adminRoute = require('./routes/admin');
const signRoute = require('./routes/sign');
const contactRoute = require('./routes/contact');
const {errorHandler} = require('./middlewares/error');

const app = express();

// * connect to Database
connectDB()

require('./config/passport');

app.use(parser.urlencoded({extended : false}))


// * statics && middlewares
app.use(statics)
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false,
    store : MongoStore.create({
        mongoUrl : process.env.MONGODB_URL
    })
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(fileUploader())

// * routes
app.use("/" ,homeRoute)
app.use('/admin', adminRoute)
app.use("/user", signRoute)
app.use("/", contactRoute)

app.use(errorHandler)

// * listen to port 300
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server has been run in ${process.env.NODE_ENV} mode port ${PORT}`) 
})