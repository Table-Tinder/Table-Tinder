var express = require('express');
var router = express.Router();
var ctrlDiners = require('../controllers/diners');
var ctrlAppointments = require('../controllers/appointments')

/* GET all appointments. */
router.get('/appointments', ctrlAppointments.appointmentList);
router.get('/appointments/:id', ctrlAppointments.appointmentFind);
module.exports = router;
