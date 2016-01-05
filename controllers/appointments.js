var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

// send status code and data as json
var sendJSON = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.appointmentList = function(req, res){
  Appointment.find(function(err, appointments){
    if (err){
      console.log("there was an error of: " + err);
      sendJSON(res, 404, err);
    }
    console.log("success");
    sendJSON(res, 200, appointments);
  });
};

module.exports.appointmentFind = function(req, res){
  Appointment.findById(req.body.id, function(err, appointment){
    if (err){
      console.log("There was an error of: " + err);
      sendJSON(res, 404, err);
    }
    console.log("success");
    sendJSON(res, 200, appointment);
  });
}
