var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Tablemates' });
});

router.get('/appointments', function(req, res, next) {
  res.render('appointments', { title: 'Appointments' });
});


module.exports = router;
