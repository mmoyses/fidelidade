var mongoose = require('mongoose'),
  Cliente = mongoose.model('Cliente'),
  Hospedagem = mongoose.model('Hospedagem');

exports.findSimple = function(req, res) {
  var id = req.params.id;
  Cliente.findOne({ _id: id }, { _id: 1, nome: 1 }).exec(function(err, cliente) {
    if (err)
      res.send(500);
    else if (!cliente)
      res.send(404);
    else
      res.send(200, cliente);
  });
};

exports.checkin = function(req, res) {
  var hospedagem,
      empresa = req.user.empresa,
      cliente = req.body.cliente,
      date = new Date(req.body.date);
  Hospedagem.findOne({ empresa: empresa, cliente: cliente, data_checkout: { $exists: false } })
    .exec(function(err, h) {
      if (err)
        res.send(500, { error: 'Não foi possível fazer o check-in do cliente ' + cliente });
      else if (h)
        res.send(409, { error: 'Cliente ' + cliente + ' já está hospedado no hotel' });
      else {
        hospedagem = new Hospedagem({
          empresa: empresa,
          data_checkin: date,
          cliente: cliente
        });
        hospedagem.save(function(err) {
          if (err)
            res.send(500, { error: 'Não foi possível fazer o check-in do cliente ' + cliente });
          else {
            Cliente.findOne({ _id: cliente }).exec(function(err, cliente) {
              if (err)
                res.send(500, { error: 'Não foi possível fazer o check-in do cliente ' + cliente });
              else if (!cliente)
                res.send(500, { error: 'Não foi possível fazer o check-in do cliente ' + cliente });
              else {
                if (!cliente.hospedagens)
                  cliente.hospedagens = [];
                cliente.hospedagens.push(hospedagem._id);
                cliente.save();
                hospedagem.nome = cliente.nome;
                hospedagem.save();
                res.send(200);
              }
            });
          }
        });
      }
    });
};

exports.findHospedagens = function(req, res) {
  var id = req.params.id;
  Cliente.findOne({ _id: id }).populate('hospedagens').exec(function(err, cliente) {
    if (err)
      res.send(500);
    else if (cliente) {
      res.send(200, { nome: cliente.nome, hospedagens: cliente.hospedagens });
    }
    else
      res.send(404);
  });
};
