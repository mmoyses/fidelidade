exports.requiresLogin = function(req, res, next) {
  var error;
  if (req.isAuthenticated()) {
    next();
  } else {
    var msg = req.flash('error')[0];
    error = true;
    if (!msg) {
      msg = '&nbsp;';
      error = false;
    }
    res.render('login', { msg: msg, error: error });
  }
};

exports.userLogin = function(req, res) {
  var error;
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    error = req.flash('error')[0] || 'Usuário ou senha inválida!';
    res.render('userLogin', { error: error });
  }
};

exports.clientLogin = function(req, res) {
  var error;
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    console.log(req.session);
    error = req.flash('error')[0] || 'Email ou senha inválida!';
    res.render('clientLogin', { error: error });
  }
};

exports.currentUser = function(req, res) {
  if (req.isAuthenticated())
    res.send(200, req.user);
  else
    res.send(401);
};
