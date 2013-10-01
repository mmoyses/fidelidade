var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fidelidade-dev');

require('../app/models/user');
var users = require('../app/controllers/users');

var req = {};
var res = {};

res.jsonp = function(user) {
  console.log(user);
};

req.body = {
  nome: 'Marcus Moyses',
  email: 'marcus.moyses@gmail.com',
  documento: '28189178830',
  senha: 'changeit'
};

req.logIn = function(user, callback) {
  console.log('Created user ' + user);
  console.log('With password ' + user.senha);
};

res.send = function(code, message) {
  console.log('Response: ' + code + '. ' + message);
};

res.redirect = function(location) {
  console.log('Redirected to ' + location);
};

res.location = function() {};

users.create(req, res);
