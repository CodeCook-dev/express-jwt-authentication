const User = require('../models/User');
const jwt = require('jwt-simple');
const config = require('../config');

const tokenForUser = (user) => {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user._id, iat: timestamp }, config.secret);
}

// SIGN UP Login
exports.signUp = (req, res, next) => {
    
    // VALIDATION
    

    // If a user is already exist
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) return res.status(422).json({success: false, message: "You must provide all the fields"});

    User.findOne({email: email}, (err, existedUser) => {
        if (err) return next(err);

        if (existedUser) return res.status(422).json({success: false, error: "Email is already in use"});

        // If a user with email does not exist, create a new one and send back
        const user = new User({
            email: email,
            password: password
        });

        user.save((err, saved) => {
            if (err) return next(err);

            return res.status(200).json({success: true, token: tokenForUser(saved)});
        });
    });

}

// SIGN IN Logic
exports.signIn = (req, res, next) => {
    return res.status(200).json({success: true, token: tokenForUser(req.user)});
}