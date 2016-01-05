var mongoose = require('mongoose');
var Diner = mongoose.model('Diner');

// send status code and data as json
var sendJSON = function(res, status, content) {
  res.status(status);
  res.json(content);
};
