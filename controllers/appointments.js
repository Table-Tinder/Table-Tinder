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
  Appointment.findById(req.params.id, function(err, appointment){
    if (err){
      console.log("There was an error of: " + err);
      sendJSON(res, 404, err);
    }
    console.log("success");
    sendJSON(res, 200, appointment);
  });
}

module.exports.appointmentCreate = function(req, res){
  var newAppointment = {
    name: req.body.name,
    attendees: [req.body.attendees],
    minAttendees: parseInt(req.body.minAttendees),
    maxAttendees: parseInt(req.body.maxAttendees),
    restaurant: req.body.restaurant,
    coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
    attendees: [req.session.currentUsername],
    attendeeIDs: [req.session.currentUserID]
  };
  console.log(newAppointment);
  console.log(req.body);
  console.log("success");
  Appointment.create(newAppointment, function(err, appointment){
    if (err){
      console.log("Appointment creation error of: " + err);
      sendJSON(res, 400, err);
    } else {
      console.log("Appointment creation success");
      res.render('single', appointment);
    }
  });
}


module.exports.appointmentDelete = function(req, res){
  Appointment.findByIdAndRemove(req.params.id, function(err){
    if (err){
      console.log("Error deleting item: " + err);
      sendJSON(res, 400, err);
    } else {
      console.log("Deleted item");
      sendJSON(res, 200, {message: "Item removed"});
    }
  })
}

module.exports.appointmentUpdate = function(req, res){
  Appointment.findByIdAndUpdate(req.params.id, req.body, function(err, appointment){
    if (err){
      console.log("Error updating item: " + err);
      sendJSON(res, 400, err);
    }
    console.log("Item updated");
    sendJSON(res, 200, appointment);
  })
}

module.exports.showAppointment = function(req, res){
  Appointment.findById(req.params.id, function(err, appointment){
    if (err){
      console.log("There was an error of: " + err);
    }
    console.log("success");
    res.render('single', appointment);
  });

}

module.exports.newAppointment = function(req, res){
  res.render('newAppointment', {title: "create a new appointment"});
}

module.exports.attendAppointment = function(req, res){

    console.log("success");
    console.log("params");
    console.log(req.params);
    console.log(req.params.id);
    Appointment.findById(req.params.id, function(err, appointment){
      if (err){
        console.log("There was an error of: " + err);
      }
      appointment.attendees.push(req.session.currentUsername);
      appointment.attendeeIDs.push(req.session.currentUserID);
      appointment.save();
      sendJSON(res, 200, {message: "updated successfully"})
    });

}

module.exports.removeMyself = function(req, res){
  console.log("removeMyself running with id:");
  console.log(req.params);
  Appointment.findById(req.params.id, function(err, appointment){
    if (err){
      console.log("There was an error of: " + err);
    }
    var userID = req.session.currentUserID;
    console.log(userID);
    for (var i = 0; i < appointment.attendeeIDs.length; i++) {
      if (appointment.attendeeIDs[i] == userID) {
        appointment.attendeeIDs.splice(i,1);
        appointment.attendees.splice(i,1);
        appointment.save();
        res.status(200);
        res.json({message: "removed"});
      }
    }
  });
}
