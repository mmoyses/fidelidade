var mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  Usuario = mongoose.model('Usuario');

module.exports = function(passport) {
  //Serialize sessions
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findOne({
      _id: id
    }, { _id: 1, nome: 1, email: 1, username: 1, empresa: 1 }, function(err, user) {
      done(err, user);
    });
  });

  //Use local strategy
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
};
