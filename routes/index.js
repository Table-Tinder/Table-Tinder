var express = require('express');
var router = express.Router();
var ctrlAppointments = require('../controllers/appointments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tablemates' });
});

router.get('/appointments', function(req, res, next) {
  res.render('appointments', { title: 'Appointments' });
});

router.get('/appointments/:id', ctrlAppointments.showAppointment);

module.exports = router;
