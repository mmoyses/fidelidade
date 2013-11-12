module.exports = function(app, passport) {
  var usuarios = require('../app/controllers/usuarios'),
    empresas = require('../app/controllers/empresas'),
    auth = require('./middlewares/authorization');
  app.get('/entrar', usuarios.signin);
  app.get('/cadastrar', usuarios.signup);
  app.get('/sair', usuarios.signout);

  app.post('/usuarios', usuarios.create);
  app.get('/usuarios/:userId', usuarios.show);
  app.post('/usuarios/session', passport.authenticate('local', {
    failureRedirect: '/entrar',
    failureFlash: 'Email ou senha inválida.'
  }), usuarios.session);

  app.get('/empresa', auth.requiresLogin ,empresas.new);
  app.post('/empresas', empresas.create);
  app.get('/empresa/:companyId', empresas.edit);
  app.post('/empresa/:companyId', empresas.editAction);

  //Home route
  var index = require('../app/controllers/index');
  app.get('/', index.render);
};
