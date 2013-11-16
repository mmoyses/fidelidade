module.exports = function(app, passport) {
  var usuarios = require('../app/controllers/usuarios'),
    empresas = require('../app/controllers/empresas'),
    auth = require('./middlewares/authorization'),
    index = require('../app/controllers/index');

  app.get('/*?', auth.requiresLogin);

  app.get('/sair', usuarios.signout);

  app.post('/entrar', passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/',
    failureFlash: 'Email ou senha inválida'
  }));

  //Home route
  app.get('/', index.render);
};
