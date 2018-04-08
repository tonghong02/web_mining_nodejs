// =======================
// get the packages we need ============
// =======================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config/database.js'); // get our config file
var User = require('./app/models/Test'); // get our mongoose model

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3000; // used to create, sign, and verify tokens
mongoose.connect(config.url).then(() => {
    console.log("connected db success!!!");
}, err => {
    console.log("connected db fail!!!");
}); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

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

    // create a sample user
    var hong = new User({
        name: 'hong04',
        password: '123456',
        admin: false
    });

    hong.save(function (err) {
        if (err) throw err;

        console.log('User saved successfully');
        res.json(nick);
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

apiRoutes.use(function (req, res, next) {
    const bearerHeader = req.headers['authorization'];

    var token = '';

    if (req.body.token || req.query.token || req.headers['x-access-token']) {
        token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
    else if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        var token = bearerToken;

        // decode token
        if (token) {
            jwt.verify(token, app.get('superSecret'), function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });

        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });

        }
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

apiRoutes.get('/', function (req, res) {
    res.json({ message: 'Welcome to the coolest API on earth!' });
});

apiRoutes.get('/users', function (req, res) {
    User.find({}, function (err, users) {
        res.json(users);
    });
});

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);
// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Listening at http://localhost:' + port);