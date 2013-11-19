exports.requiresLogin = function(req, res, next) {
  var error;
  if (req.isAuthenticated()) {
    next();
  } else {
    var msg = req.flash('error')[0],
      error = true;
    if (!msg) {
      msg = '&nbsp;'
      error = false;
    }
    res.render('login', { msg: msg, error: error });
  }
};

exports.userLogin = function(req, res, next) {
  var error;
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    error = req.flash('error')[0];
    res.render('userLogin', { error: error });
  }
};

exports.clientLogin = function(req, res, next) {
  var error;
  if (req.isAuthenticated()) {
    res.render('index');
  } else {
    error = req.flash('error')[0];
    res.render('clientLogin', { error: error });
  }
};
