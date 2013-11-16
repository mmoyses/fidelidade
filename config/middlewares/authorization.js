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
