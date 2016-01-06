// account router
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Account = require('../models/Account');
var router = express.Router();

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

router.get('/', function(req, res) {
  res.render('account', { user: req.user });
});

router.get('/register', function(req, res) {
  res.render('register', { user: req.user });
});

router.post('/register', function(req, res) {
  var session = req.session;
  session.username = req.body.username;
  var username = req.body.username;
  var password = req.body.password;
  // res.status(200).send('username is:' + username);
  Account.register(new Account({
    username: username,
    password: password
  }),
  req.body.password, function(error, account) {
      if (error) {
        res.status(200).send(error);
        return res.render('register', { account: account });
      }
      passport.authenticate('local')(req, res, function() {
        res.render('index', { user: session.username});
        // res.redirect('/');
      });
  })
});

router.get('/login', function(req, res) {
  res.render('login', { user: req.user });

});

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    var session = req.session;
    session.username = req.body.username;
    res.redirect('../account/user/:id');
    // res.render('index', { user: session.username});
  }
);

router.get('/user', function(req, res){
  res.render('user', { user: req.user });
});

router.get('/user/:id', function(req, res){
  Account.findById(req.user.id, function(err, user){
    if (err) {
      res.json(err);
    }
    else {
      res.render('user', { user: req.user});
    }
  });

  // res.redirect('/');
  // res.render('user', { message: 'worked!' });
});


router.get('/leave', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/protectedresourced', function(req, res) {
  res.status(200).send('the secret to every success is to never stop');
});

module.exports = router;
