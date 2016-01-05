var mongoose = require('mongoose');

var dinerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  appointments: [String]
});

mongoose.model('Diner', dinerSchema, 'diners');
