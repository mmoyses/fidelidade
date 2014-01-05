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
  var id = req.params.id,
      empresa = req.user.empresa;
  Hospedagem.find({ empresa: empresa, cliente: id }).exec(function(err, hospedagens) {
    if (err)
      res.send(500);
    else if (hospedagens && hospedagens.length > 0) {
      res.send(200, { nome: hospedagens[0].nome, hospedagens: hospedagens });
    }
    else {
      Cliente.findOne({ _id: id }, { nome: 1 }).exec(function(err, cliente) {
        if (err)
          res.send(500);
        else if(!cliente)
          res.send(404);
        else
          res.send(200, { nome: cliente.nome, hospedagens: []});
      });
    }
  });
};

function getCliente(sent) {
  var cliente = {};
  cliente.nome = sent.nome;
  cliente.email = sent.email;
  cliente.documento = sent.documento;
  cliente.endereco = sent.endereco;
  cliente.cidade = sent.cidade;
  cliente.estado = sent.estado;
  cliente.cep = sent.cep;
  cliente.telefone = sent.telefone;
  cliente.celular = sent.celular;
  cliente.empresa = sent.empresa;
  cliente.senha = sent.senha;
  cliente.confirm = sent.confirm;
  cliente._id = mongoose.Types.ObjectId();
  return cliente;
}

exports.newCliente = function(req, res, next) {
  var c = getCliente(req.body),
      error = false,
      cliente;
  if (c.senha !== c.confirm)
    error = true;
  if (!error) {
    cliente = new Cliente(c);
    cliente.save(function(err) {
      if (err) {
        console.log('err' + err);
        res.render('login', { errors: err.errors, cliente: cliente });
      } else {
        req.login(cliente, function(error) {
          console.log('error' + error);
          if (error)
            next(error);
          else
            res.redirect('/');
        });
      }
    });
  } else
    res.render('login', { errors: { confirm: { message: 'Confirmação não estava igual' } }, cliente: c });
};
