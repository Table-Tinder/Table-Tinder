var mongoose = require('mongoose');
var Account = mongoose.model('Account');

// send status code and data as json
var sendJSON = function(res, status, content) {
  res.status(status);
  res.json(content);
};
