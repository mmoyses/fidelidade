exports.requiresLogin = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/entrar');
  }
};
