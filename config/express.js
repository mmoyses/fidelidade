var express = require('express'),
  mongoStore = require('connect-mongo')(express),
  flash = require('connect-flash'),
  helpers = require('view-helpers'),
  config = require('./config'),
  security = require('../app/common/security');

module.exports = function(app, passport) {
  app.set('showStackError', true);

  //Setting the fav icon and static folder
  app.use(express.favicon());
  app.use(express.static(config.root + '/public'));

  //Don't use logger for test env
  if (process.env.NODE_ENV !== 'test') {
    app.use(express.logger('dev'));
  }

  //Set views path, template engine and default layout
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  //Enable jsonp
  app.enable('jsonp callback');

  app.configure(function() {
    //cookieParser should be above session
    app.use(express.cookieParser());

    //bodyParser should be above methodOverride
    app.use(express.bodyParser());
    app.use(express.methodOverride());

    //express/mongo session storage
    app.use(express.session({
      secret: security.key,
      store: new mongoStore({
        url: config.db,
        collection: 'sessions'
      })
    }));

    //connect flash for flash messages
    app.use(flash());

    //dynamic helpers
    app.use(helpers(config.app.name));

    //use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    //routes should be at the last
    app.use(app.router);

    app.use(function(err, req, res, next) {
      //Treat as 404
      if (~err.message.indexOf('not found')) return next();

      //Log it
      console.error(err.stack);

      //Error page
      res.status(500).render('500', {
        error: err.stack
      });
    });

    //Assume 404 since no middleware responded
    app.use(function(req, res) {
      res.status(404).render('404', {
        url: req.originalUrl,
        error: 'Not found'
      });
    });

  });
};
