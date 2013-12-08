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

  app.get('/relatorio.csv', function(req, res) {
    var startDate = new Date(req.query.startDate),
        endDate = new Date(req.query.endDate);
    res.setHeader('Content-disposition', 'attachment; filename=relatorio.csv');
    res.setHeader('Content-type', 'text/csv');
    res.send(200, 'lala;lele');
  });

  //Home route
  app.get('/', index.render);
};
