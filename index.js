var cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
app.options('*', cors());
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/database.js'); // get our config file


var Movie = require('./app/models/Movie');
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
var port = process.env.PORT || 3000;

mongoose.connect(config.url).then(() => {
    console.log("connected db 'recommendation-movie-system' success!!!");
}, err => {
    console.log("connected db fail!!!");
});


app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// =======================
// import data from json file 
// =======================
const fs = require('fs');
// var bcrypt = require('bcrypt-nodejs');
// function generateHash(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// }

// let rawdata = fs.readFileSync('fullMovieInfo.json');  
// let student = JSON.parse(rawdata); 
// for(let i = 0; i < student.length; i++){
//     let user = new Movie(student[i]);
//     // user.password = generateHash(student[i].password)
//     console.log("studen " + (i + 1));
//     // console.log(student[i]);
//     Movie.create(user, (err, userr) => {
//         console.log(userr)
//     });
// } 
// ===== end import data =====

app.post('/api/login', authenticateController.login)

app.get('/api/user', userController.getList);
app.get('/api/user/:id', userController.get);
app.post('/api/user', userController.create)

app.get('/api/review', reviewController.getList);
app.get('/api/review/:id', reviewController.get);
app.get('/api/review/find/:user/:movie', reviewController.findUserMovie);

app.get('/api/movie', movieController.getList);
app.get('/api/movie/search', movieController.search);
app.get('/api/movie/top_imdb', movieController.topIMDB);
app.get('/api/movie/:title', movieController.get);

app.get('/api/history', historyController.getList);
app.get('/api/history/:id', historyController.get);

app.get('/api/country', countryController.getList);
app.get('/api/country/:id', countryController.get);

app.get('/api/category', categoryController.getList);
app.get('/api/category/:id', categoryController.get);

app.use(authenticateController.authenticate);

// test basic route
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

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