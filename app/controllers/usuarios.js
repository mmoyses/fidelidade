var mongoose = require('mongoose'),
  Usuario = mongoose.model('Usuario');

function extractUserContent(submitted) {
  var usuario = {};
  usuario.nome = submitted.nome;
  usuario.email = submitted.email;
  usuario.senha = submitted.senha;
  return usuario;
}

exports.authCallback = function(req, res) {
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
    user: new Usuario()
  });
};

exports.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

exports.session = function(req, res) {
  res.redirect('/');
};

exports.create = function(req, res, next) {
  var usuario = new Usuario(extractUserContent(req.body));
  usuario.save(function(err, usuario) {
    if (err) {
      return res.render('users/signup', {
        errors: err.errors,
        user: usuario
      });
    }
    req.logIn(usuario, function(err) {
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
  Usuario.findOne({
    _id: id
  }).exec(function(err, usuario) {
    if (err) return next(err);
    if (!usuario) return next(new Error('Usuário não encontrado ' + id));
    req.profile = usuario;
    next();
  });
};
