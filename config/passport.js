

const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcryptjs');

const User = require('../models/user');


passport.use( new Strategy({usernameField : "email"} , async (email, password, done) => {

    try {
        const user = await User.findOne({email})

        if(!user) {
            done(null, false, {message : "There is no users with this details !"})
        }
    
        const isMatch = await bcrypt.compare(password, user.password)
    
        if(isMatch) {
            done(null, user)
        } else {
            done(null, false, {message : "There is no users with this details !"})
        }
        
    } catch (err) {
        console.log(err)    
    }
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    User.findById(id);
    done(null, id);
})

// passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => {
//         done(err, user)
//     })
// })
