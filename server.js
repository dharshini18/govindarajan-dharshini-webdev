var app = require('./express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

/*var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-summer1-2017');
mongoose.Promise = require('q').Promise;*/

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(app.express.static(__dirname + '/public'));

app.use(cookieParser());
app.use(session({secret: process.env.SESSION_SECRET}));
app.use(passport.initialize());
app.use(passport.session());

require('./assignment/session/app');
require('./assignment/app');
require('./test/app');
require('./project/app');

app.listen(process.env.PORT || 3000);