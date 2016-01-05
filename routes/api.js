var express = require('express');
var router = express.Router();
var ctrlDiners = require('../controllers/diners');
var ctrlAppoinments = require('../controllers/appointments')

/* GET all appointments. */
router.get('/appointments', ctrlAppoinments.appointmentList);

module.exports = router;
