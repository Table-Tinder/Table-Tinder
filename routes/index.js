var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tablemates' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.get('/appointments', function(req, res, next) {
  res.render('appointments', { title: 'Appointments' });
});

router.get('/appointments/:id', function(req, res, next){
  res.render('single', { title: 'Appointment', appointmentID: req.params.id});
});


module.exports = router;
