// set up ======================================================================
// get all the tools we need
var bodyParser =	require("body-parser");
var express  = require('express');
var session = require('express-session');
var morgan = require("morgan");
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var app      = express();
var multer	 =	require('multer');
var cookieParser = require("cookieparser");

// var userController = require('./app/controllers/userController');
// var restController = require('./app/controllers/restController');
// var dishController = require('./app/controllers/dishController');
// var adminController = require('./app/controllers/adminController');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url).then(() => {
    console.log("connect success!!!");
}, err => {
    console.log("Error connect")
});
 // connect to our database
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// require('./config/passport')(passport); // pass passport for configuration
// require('./config/restpassport')(passport); 


	// set up our express application
	// app.use("/assets", express.static(__dirname + "/public"));
	// app.use("/script", express.static(__dirname + "/node_modules"));
	// app.use(cookieParser()); // read cookies (needed for auth)
	app.use(bodyParser()); // get information from html forms

	//app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	// app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
	// app.use(passport.initialize());
	// app.use(passport.session()); // persistent login sessions
	// app.use(flash()); // use connect-flash for flash messages stored in session
	


// routes ======================================================================
// require('./app/routes/user.js')(app, passport); // load our routes and pass in our app and fully configured passport
// require('./app/routes/rest.js')(app, passport);
// require('./app/routes/admin.js')(app, passport);
// userController(app);
// restController(app);
// dishController(app);
// adminController(app);





app.listen(port);
console.log('The server listen on port ' + port);

