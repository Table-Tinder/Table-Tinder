var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uglifyJS = require('uglify-js');
var fs = require('fs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('./models/db');

// var routes = require('./routes/index');
var api = require('./routes/api');
var accounts = require('./routes/account');

var app = express();
// set up express sessions
app.use(require('express-session')({
  secret: 'this is a secret session',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// end session setup

// configure passport
var Account = require('./models/Account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
// end configure passport




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var appClientFiles = [
  'client/app.js',
  'client/home/home.controller.js',
  'client/common/directives/navigation/navigation.directive.js',
  'client/appointments/appointments.controller.js',
  'client/appointmentDetail/appointmentDetail.controller.js', 
  'client/common/services/api.service.js'
];
var uglified = uglifyJS.minify(appClientFiles, { compress: false});
fs.writeFile('public/angular/tableMates.min.js', uglified.code, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log('Script generated and saved: tableMates.min.js');
  }
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));
// app.use('/', routes);
app.use('/api', api);
app.use('/account', accounts);
app.use(function(req, res){
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
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
