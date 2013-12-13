var mongoose = require('mongoose'),
    Hospedagem = mongoose.model('Hospedagem');

exports.findOpen = function(req, res) {
  var empresa = req.user.empresa;
  Hospedagem.find({ empresa: empresa, data_checkout: {$exists: false } }).exec(function(err, hospedagens) {
    if (err)
      res.send(500);
    else if (hospedagens && hospedagens.length > 0) {
      res.send(200, hospedagens);
    } else
      res.send(404);
  });
};

exports.checkout = function(req, res) {
  var id = mongoose.Types.ObjectId(req.body.hospedagem),
      date = new Date(req.body.date),
      price = req.body.price;
  Hospedagem.findOne({ _id: id }).exec(function(err, hospedagem) {
    if (err)
      res.send(500, { error: 'Não foi possível fazer check-out' });
    else if (!hospedagem)
      res.send(404, { error: 'Não foi possível fazer check-out' });
    else {
      if (date < hospedagem.data_checkin) {
        res.send(409, { error: 'Data de check-out não pode ser anterior ao check-in' });
      } else {
        hospedagem.data_checkout = date;
        hospedagem.pontos = price * 0.01;
        hospedagem.save();
        res.send(200);
      }
    }
  });
};
