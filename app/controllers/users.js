var mongoose = require('mongoose'),
  User = mongoose.model('User');

exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

exports.signin = function(req, res) {
  res.render('users/signin', {
    title: 'Login',
    message: req.flash('error')
  });
};

exports.signup = function(req, res) {
  res.render('users/signup', {
    title: 'Cadastro',
    user: new User()
  });
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.session = function(req, res) {
  res.redirect('/');
};

exports.create = function(req, res) {
  var user = new User(req.body);
  user.save(function(err, user) {
    if (err) {
      return res.render('users/signup', {
        errors: err.errors,
        user: user
      });
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
        return res.redirect('/');
    });
  });
};

exports.show = function(req, res) {
  var user = req.profile;

  res.render('users/show', {
    title: user.name,
    user: user
  });
};

exports.me = function(req, res) {
  res.jsonp(req.user || null);
};

exports.user = function(req, res, next, id) {
  User.findOne({
    _id: id
  }).exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next(new Error('Usuário não encontrado ' + id));
    req.profile = user;
    next();
  });
};
