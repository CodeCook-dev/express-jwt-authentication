const express = require('express');
const http = require('http')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const connectDB = require('./config/database');

const app = express();

// DB SETUP
connectDB();

// MIDDLEWARES
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}));

router(app);

const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('Server is listening on port', port);