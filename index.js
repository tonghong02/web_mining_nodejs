var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/database.js'); // get our config file

var Test = require('./app/models/Test');
var User = require('./app/models/User');

var authenticateController = require("./app/controllers/authenticateController");
var authenticateRoute = require("./app/routes/authenticateRoute");

var Country = require('./app/models/Country');
var countryController = require("./app/controllers/countryController");
var countryRoute = require("./app/routes/countryRoute");

var Category = require('./app/models/Category');
var categoryController = require("./app/controllers/categoryController");
var categoryRoute = require("./app/routes/categoryRoute");


var userController = require("./app/controllers/userController");
var userRoute = require("./app/routes/userRoute");

var Movie = require('./app/models/Movie');
var movieController = require("./app/controllers/movieController");
var movieRoute = require("./app/routes/movieRoute");

var History = require('./app/models/History');
var historyController = require("./app/controllers/historyController");
var historyRoute = require("./app/routes/historyRoute");

var Review = require('./app/models/Review');
var reviewController = require("./app/controllers/reviewController");
var reviewRoute = require("./app/routes/reviewRoute");

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens

mongoose.connect(config.url).then(() => {
    console.log("connected db 'recommendation-movie-system' success!!!");
}, err => {
    console.log("connected db fail!!!");
});
// app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// test basic route
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

// authenticate route have to first use!!
app.use('/api', authenticateRoute);
app.use('/api', countryRoute);
app.use('/api', categoryRoute);
app.use('/api', userRoute);
app.use('/api', movieRoute);
app.use('/api', historyRoute);
app.use('/api', reviewRoute);

// use morgan to log requests to the console
// app.use(morgan('dev'));

app.listen(port);
console.log('Listening at http://localhost:' + port);