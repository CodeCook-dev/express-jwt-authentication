const passport = require('passport');
const User = require('../models/User');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const localOptions = {
    usernameField: 'email'
};

 // create local strategy
 const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);

        user.comparePassword(password, function(err, isMatched) {
            if (err) return done(err);
            if (!isMatched) return done(null, false);

            return done(null, user);
        })
    });
 });

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtAuthMiddlware = new JwtStrategy(jwtOptions, (payload, done) => {
    // see if the user exist in the payload exist in our database

    // if it does, call 'done' with that user

    // otherwise , call 'done' without user object
    User.findById(payload.sub, (err, user) => {
        
        if (err) return done(err, false);

        if (user) {
            done(null, user);
        }else {
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtAuthMiddlware);
passport.use(localLogin);