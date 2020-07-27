const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// On save Hook, hash the password
userSchema.pre('save', function(next) {
    const user = this;

    bcrypt.genSalt(10, function(err,salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

// create the model class
const model = mongoose.model('user', userSchema);

// export the model
module.exports = model;