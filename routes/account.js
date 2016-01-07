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
    Account.findOne({username: req.body.username}, function(err, user){
      if (err){
        console.log(err);
      } else {
        session.currentUserID = user._id;
        session.currentUsername = user.username;
        console.log(user._id);
        console.log(user.username);
        res.redirect('../account/user/' + session.currentUserID);
      }

    });
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
});


router.get('/leave', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/protectedresourced', function(req, res) {
  res.status(200).send('the secret to every success is to never stop');
});

module.exports = router;
