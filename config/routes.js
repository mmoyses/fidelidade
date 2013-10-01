var async = require('async');

module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/entrar', users.signin);
    app.get('/cadastrar', users.signup);
    app.get('/sair', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/entrar',
        failureFlash: 'Email ou senha inválida.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes
    // var articles = require('../app/controllers/articles');
    // app.get('/articles', articles.all);
    // app.post('/articles', auth.requiresLogin, articles.create);
    // app.get('/articles/:articleId', articles.show);
    // app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    // app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);

    //Finish with setting up the articleId param
    // app.param('articleId', articles.article);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
};
