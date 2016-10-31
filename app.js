require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var expressValidator = require('express-validator');
//var flash = require('connect-flash');
//var session = require('express-session');

var uglifyJs = require("uglify-js");
var fs = require('fs');

var passport = require('passport');

//var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');

require('./app_api/models/db');
require('./app_api/config/passport');

var routes = require('./app/routes/index');
var routesApi = require('./app_api/routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'jade');
app.use('/bower_components', express.static(__dirname + '/bower_components'));

//for optimizing the app 
var appClientFiles = [
  'app_client/app.js',
  'app_client/controllers/home.controller.js',
  'app_client/services/edumaData.service.js',
  //'app_client/common/directives/pageHeader.directive.js',
  'app_client/services/authentication.service.js',
  'app_client/controllers/register.controller.js',
  'app_client/controllers/login.controller.js'
  //'app_client/auth/login/login.controller.js',
  //'app_client/common/directives/navigation/navigation.controller.js'
];
var uglified = uglifyJs.minify(appClientFiles, { compress : false });
fs.writeFile('public/angular/eduma.min.js', uglified.code, function (err){
  if(err) {
    console.log(err);
  } else {
    console.log("Script generated and saved:", 'eduma.min.js');
  }
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// BodyParser Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

app.use(passport.initialize());

//app.use('/', routes);
app.use('/api', routesApi);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'app_client', 'index.html'));
});


//NEEDED?
// Express Session
/*app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));*/

// Passport init
/*app.use(passport.initialize());
app.use(passport.session());*/

// Express Validator
/*app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));*/

// Connect Flash
//app.use(flash());

// Global Vars
/*app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});*/

// error handlers
// Catch unauthorised errors
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
