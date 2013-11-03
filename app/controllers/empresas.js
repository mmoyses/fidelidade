var mongoose = require('mongoose'),
  Empresa = mongoose.model('Empresa');

function extractEmpresaContent(submitted) {
  var empresa = {};
  empresa.nome = submitted.nome;
  empresa.ativa = submitted.ativa;
  empresa.tipo = submitted.tipo;
  empresa.textoVoucher = submitted.textoVoucher;
  empresa.pontuacao = submitted.pontuacao;
  return empresa;
}

function updateEmpresa(current, updated) {
  current.nome = updated.nome;
  current.ativa = updated.ativa;
  current.tipo = updated.tipo;
  current.textoVoucher = updated.textoVoucher;
  current.pontuacao = updated.pontuacao;
}

exports.create = function(req, res) {
  var empresa = new Empresa(extractEmpresaContent(req.body));
  empresa.save(function(err, empresa) {
    if (err) {
      return res.render('company/create', {
        errors: err.errors,
        empresa: empresa
      });
    }
    return res.render('company/create', {
      message: 'Empresa criada com sucesso',
      empresa: new Empresa()
    });
  });
};

exports.new = function(req, res) {
  res.render('company/create', {
    title: 'Cadastro',
    empresa: new Empresa()
  });
};

exports.edit = function(req, res) {
  var id = req.params.companyId;
  Empresa.findOne({
    _id: id
  }).exec(function(err, empresa) {
    if (err) {
      return res.render('company/create', {
        errors: err.errors,
        empresa: empresa
      });
    }
    return res.render('company/edit', {
      empresa: empresa
    });
  });
};

exports.editAction = function(req, res) {
  var id = req.params.companyId;
  switch (req.body.op) {
  case 'Editar':
    Empresa.findOne({
      _id: id
    }).exec(function(err, empresa) {
      if (err) {
        return res.render('company/edit', {
          errors: err.errors,
          empresa: empresa
        });
      }
      else {
        updateEmpresa(empresa, req.body);
        empresa.save();
        return res.render('company/edit', {
          message: 'Empresa alterada com sucesso',
          empresa: empresa
        });
      }
    });
    break;
  case 'Remover':
    Empresa.findByIdAndRemove(id, function(err, empresa) {
      if (err) {
        return res.render('company/create', {
          errors: err.errors,
          empresa: empresa
        });
      }
      else {
        return res.render('company/create', {
          message: 'Empresa removida com sucesso',
          empresa: new Empresa()
        });
      }
    });
    break;
  }
};
