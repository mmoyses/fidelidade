module.exports = function(app, passport) {
  var usuario = require('../app/controllers/usuario'),
    auth = require('./middlewares/authorization'),
    index = require('../app/controllers/index'),
    cliente = require('../app/controllers/cliente'),
    hospedagem = require('../app/controllers/hospedagem');

  app.get('/login', auth.userLogin);
  app.get('/erro', auth.clientLogin);

  app.get('/*?', auth.requiresLogin);

  app.get('/sair', usuario.signout);

  app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: 'Usuário ou senha inválida!'
  }));

  app.post('/entrar', passport.authenticate('local-client', {
    failureRedirect: '/erro',
    successRedirect: '/',
    failureFlash: true
  }));

  app.post('/', cliente.newCliente);

  app.get('/relatorio.csv', hospedagem.relatorio);

  app.get('/data/cliente/:id', cliente.findSimple);
  app.post('/data/checkin', cliente.checkin);
  app.get('/data/checkout', hospedagem.findOpen);
  app.post('/data/checkout', hospedagem.checkout);
  app.get('/data/cliente/hospedagens/:id', cliente.findHospedagens);
  app.get('/data/hospedagens', hospedagem.findHospedagens);
  app.get('/data/current-user', auth.currentUser);

  //Home route
  app.get('/', index.render);
};
