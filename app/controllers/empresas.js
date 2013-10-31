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

exports.create = function(req, res) {
  var empresa = new Empresa(extractEmpresaContent(req.body));
  empresa.save(function(err, empresa) {
    if (err) {
      return res.render('empresa/error', {
        errors: err.errors,
        empresa: empresa
      });
    }
    return res.render('empresa/success', {
      empresa: empresa
    });
  });
};
