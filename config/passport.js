var mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  Usuario = mongoose.model('Usuario'),
  Cliente = mongoose.model('Cliente');

module.exports = function(passport) {
  //Serialize sessions
  passport.serializeUser(function(user, done) {
    if (user.username)
      done(null, user.username);
    else
      done(null, user.id);
  });

  passport.deserializeUser(function(username, done) {
    Usuario.findOne({
      username: username
    }, { _id: 1, nome: 1, email: 1, username: 1, empresa: 1 }, function(err, user) {
      if (!err && !user)
        done('pass');
      else
        done(err, user);
    });
  });

  passport.deserializeUser(function(id, done) {
    Cliente.findOne({
      _id: id
    }, { _id: 1, nome: 1, email: 1, pontos: 1, hospedagens: 1, resgates: 1 }, function(err, client) {
      done(err, client);
    });
  });

  //usuario login
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'senha'
  },
  function(username, password, done) {
    Usuario.findOne({
      username: username
    }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'Usuário ou senha inválida!'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Usuário ou senha inválida!'
        });
      }
      return done(null, user);
    });
  }));

  //cliente login
  passport.use('local-client', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'senha'
  },
  function(email, password, done) {
    Cliente.findOne({
      email: email
    }, function(err, client) {
      if (err) {
        return done(err);
      }
      if (!client) {
        return done(null, false, {
          message: 'Email ou senha inválida!'
        });
      }
      if (!client.authenticate(password)) {
        return done(null, false, {
          message: 'Email ou senha inválida!'
        });
      }
      return done(null, client);
    });
  }));
};
