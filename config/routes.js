module.exports = function(app, passport) {
  var usuarios = require('../app/controllers/usuarios'),
    empresas = require('../app/controllers/empresas'),
    auth = require('./middlewares/authorization'),
    index = require('../app/controllers/index');

  app.get('/login', auth.userLogin);
  app.get('/erro', auth.clientLogin);

  app.get('/*?', auth.requiresLogin);

  app.get('/sair', usuarios.signout);

  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: 'Usuário ou senha inválida!'
  }));

  app.post('/entrar', passport.authenticate('local-client', {
    failureRedirect: '/erro',
    successRedirect: '/',
    failureFlash: 'Email ou senha inválida!'
  }));

  //Home route
  app.get('/', index.render);
};
