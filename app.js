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

const app = express();

// * connect to Database
connectDB()

require('./config/passport');

app.use(parser.urlencoded({extended : false}))

// * logging
// if(process.env.NODE_ENV === "development") {
//     debug("morgan is working correctly ", { stream : winston.stream })
//     app.use(morgan("tiny"))
// }

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


// * engines
// app.use(layoutManager)
// app.set('layout', './layouts/main/index');

app.set("view engine" , "ejs")
app.set("views", "views")

// * routes
app.use("/" ,homeRoute)
app.use('/admin', adminRoute)
app.use("/user", signRoute)
app.use("/", contactRoute)

// * 404
app.use("",require('./controllers/errors').get404)

// * listen to port 300
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`server has been run in ${process.env.NODE_ENV} mode port ${PORT}`) 
})