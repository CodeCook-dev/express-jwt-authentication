const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost:27017/mern_auth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },(err, connected) => {
        if (err) console.error(err);
        console.log('MongoDb connected!!!');
    });
}