var express = require('express');
var router = express.Router();
// var ctrlAccounts = require('../controllers/accounts');
var ctrlAppointments = require('../controllers/appointments');
var ctrlAuth = require('../controllers/authentication');

router.get('/appointments', ctrlAppointments.appointmentList);
router.get('/appointments/:id', ctrlAppointments.appointmentFind);
router.post('/appointments', ctrlAppointments.appointmentCreate);
router.delete('/appointments/:id', ctrlAppointments.appointmentDelete);
router.put('/appointments/:id', ctrlAppointments.appointmentUpdate);
router.patch('/appointments/:id', ctrlAppointments.appointmentUpdate);
router.put('/appointments/attend/:id', ctrlAppointments.attendAppointment);
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// router.get('/accounts', ctrlAccounts.accountList);
// router.get('/accounts/:id', ctrlAccounts.accountFind);
// router.post('/accounts', ctrlAccounts.accountCreate);
// router.delete('/accounts/:id', ctrlAccounts.accountDelete);
// router.put('/accounts/:id', ctrlAccounts.accountUpdate);
// router.patch('/accounts/:id', ctrlAccounts.accountUpdate);

module.exports = router;
