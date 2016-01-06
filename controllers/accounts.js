var mongoose = require('mongoose');
var Account = mongoose.model('Account');

// send status code and data as json
var sendJSON = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.dinerList = function(req, res){
  Account.find(function(err, accounts){
    if (err){
      console.log("there was an error of: " + err);
      sendJSON(res, 404, err);
    }
    console.log("success");
    sendJSON(res, 200, accounts);
  });
};

module.exports.dinerFind = function(req, res){
  Account.findById(req.params.id, function(err, account){
    if (err){
      console.log("There was an error of: " + err);
      sendJSON(res, 404, err);
    }
    console.log("success");
    sendJSON(res, 200, account);
  });
}
