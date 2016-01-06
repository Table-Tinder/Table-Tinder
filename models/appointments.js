var mongoose = require('mongoose');

var appointmentSchema = new mongoose.Schema({
  name:{
    type: String,
    // required: true
  },
  attendees:{
    type: [String],
    // required: true
  },
  minAttendees: {
    type: Number,
    // required: true
  },
  maxAttendees: Number,
  coords: {
    type: [Number],
    index: '2dsphere'
  },
  restaurant: String,
  date: {
        type: Date,
        "default": Date.now //need to add 1 day to this
    }
});

mongoose.model('Appointment', appointmentSchema, 'appointments');
