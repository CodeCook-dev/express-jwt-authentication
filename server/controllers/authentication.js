const User = require('../models/User');

exports.signUp = (req, res, next) => {
    
    // VALIDATION


    // If a user is already exist
    const email = req.body.email;
    const password = req.body.password;

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

            return res.status(200).json({success: true, user: saved});
        });
    });

}