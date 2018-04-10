var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/database.js'); // get our config file

var Test = require('./app/models/Test');
var User = require('./app/models/User');
var Review = require('./app/models/Review');
var History = require('./app/models/History');
var Country = require('./app/models/Country');
var Category = require('./app/models/Category');
var Movie = require('./app/models/Movie');

var countryController = require("./app/controllers/countryController");
var countryRoute = require("./app/routes/countryRoute")

var categoryController = require("./app/controllers/categoryController");
var categoryRoute = require("./app/routes/categoryRoute")

var userController = require("./app/controllers/userController");
var userRoute = require("./app/routes/userRoute");

var movieController = require("./app/controllers/movieController");
var movieRoute = require("./app/routes/movieRoute");

var historyController = require("./app/controllers/historyController");
var historyRoute = require("./app/routes/historyRoute");

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
app.set('superSecret', config.secret); // secret variable

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api', countryRoute);
app.use('/api', categoryRoute);
app.use('/api', userRoute);
app.use('/api', movieRoute);
app.use('/api', historyRoute);
app.use('/api', reviewRoute);

// use morgan to log requests to the console
// app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function (req, res) {
    res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.get('/setup', function (req, res) {
    var hong = new History({
        user: "5accb97dae70d024f1b9b2f1",
        movie: "5acad0c88a88ff2d4688ea80"
    })

    hong.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json(hong);
    });
});
app.get('/categories', function (req, res) {
    Category.find({}, function (err, users) {
        res.json(users);
    });
});

app.get('/users', function (req, res) {
    User.find({ _id: "5acad540cd8c9232ab0d9fe2" }, function (err, users) {
        res.json(users);
    });
});

// API ROUTES -------------------
var apiRoutes = express.Router();

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {

            if (user.password != req.body.password) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
                const payload = {
                    // email: user.email
                    name: user.name
                };

                // expiresInMinutes: 1440 // expires in 24 hours

                var token = jwt.sign(payload, app.get('superSecret'));

                res.json({
                    success: true,
                    name: user.name,
                    message: 'Enjoy your token!',
                    token: token,

                });
            }

        }

    });
});
// hong04: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImlhdCI6MTUyMzE5NDYzM30.wr7YR6_WP30hvN07J5O9d_Zxy05L7zm2KmRbx0RbzT8

// apiRoutes.use(function (req, res, next) {
//     const bearerHeader = req.headers['authorization'];

//     var token = '';

//     if (req.body.token || req.query.token || req.headers['x-access-token']) {
//         token = req.body.token || req.query.token || req.headers['x-access-token'];
//         if (token) {
//             jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//                 if (err) {
//                     return res.json({ success: false, message: 'Failed to authenticate token.' });
//                 } else {
//                     req.decoded = decoded;
//                     next();
//                 }
//             });
//         } else {
//             return res.status(403).send({
//                 success: false,
//                 message: 'No token provided.'
//             });
//         }
//     }
//     else if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(' ');
//         const bearerToken = bearer[1];

//         var token = bearerToken;

//         // decode token
//         if (token) {
//             jwt.verify(token, app.get('superSecret'), function (err, decoded) {
//                 if (err) {
//                     return res.json({ success: false, message: 'Failed to authenticate token.' });
//                 } else {
//                     req.decoded = decoded;
//                     next();
//                 }
//             });

//         } else {
//             return res.status(403).send({
//                 success: false,
//                 message: 'No token provided.'
//             });

//         }
//     } else {
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//     }
// });

apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/tests', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

app.listen(port);
console.log('Listening at http://localhost:' + port);