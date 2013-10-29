exports.requiresLogin = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.send(401, 'Usuário não autorizado');
  }
  next();
};

exports.user = {
  hasAuthorization: function(req, res, next) {
    if (req.profile.id !== req.user.id) {
      return res.send(401, 'Usuário não autorizado');
    }
    next();
  }
};

exports.article = {
  hasAuthorization: function(req, res, next) {
    if (req.article.user.id !== req.user.id) {
      return res.send(401, 'Usuário não autorizado');
    }
    next();
  }
};
