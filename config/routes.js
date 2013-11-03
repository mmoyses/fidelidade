module.exports = function(app, passport) {
  var usuarios = require('../app/controllers/usuarios'),
    empresas = require('../app/controllers/empresas');
  app.get('/entrar', usuarios.signin);
  app.get('/cadastrar', usuarios.signup);
  app.get('/sair', usuarios.signout);

  app.post('/usuarios', usuarios.create);

  app.post('/usuarios/session', passport.authenticate('local', {
    failureRedirect: '/entrar',
    failureFlash: 'Email ou senha inválida.'
  }), usuarios.session);

  app.get('/usuarios/eu', usuarios.me);
  app.get('/usuarios/:userId', usuarios.show);

  //Finish with setting up the userId param
  app.param('userId', usuarios.user);

  app.get('/empresa', empresas.new);
  app.post('/empresas', empresas.create);
  app.get('/empresa/:companyId', empresas.edit);
  app.post('/empresa/:companyId', empresas.editAction);

  //Home route
  var index = require('../app/controllers/index');
  app.get('/', index.render);
};
