var express = require('express');
var router = express.Router();
var ctrlAppointments = require('../controllers/appointments');

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

router.get('/appointments/create', ctrlAppointments.newAppointment);
router.put('/appointments/removeMyself/:id', ctrlAppointments.removeMyself);
router.get('/appointments/:id', ctrlAppointments.showAppointment);



module.exports = router;
