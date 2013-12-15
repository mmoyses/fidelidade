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

exports.findHospedagens = function(req, res) {
  var startDate = new Date(Number(req.query.startDate)),
      endDate = new Date(Number(req.query.endDate)),
      empresa = req.user.empresa;
  Hospedagem.find({ empresa: empresa, data_checkout: { $gte: startDate, $lte: endDate } }, { empresa: 0 })
    .exec(function(err, hospedagens) {
    if (err)
      res.send(500);
    else if(hospedagens && hospedagens.length > 0) {
      res.send(200, hospedagens);
    } else
      res.send(404);
  });
};

function getDate(date) {
  var day, month, year;
  day = date.getDate().toString();
  if (day.length === 1)
    day = '0' + day;
  month = (date.getMonth() + 1).toString();
  if (month.length === 1)
    month = '0' + month;
  year = date.getFullYear().toString();

  return day + '/' + month + '/' + year;
}

function toReal(price) {
  var p = price.toFixed(2);
  return p.replace(',', '#').replace('.', ',').replace('#', '.');
}

exports.relatorio = function(req, res) {
  var startDateParam = req.query.startDate,
      endDateParam = req.query.endDate || Date.now().toString(),
      empresa = req.user.empresa,
      text = 'Cliente;Data Checkin-in;Data Check-out;R$ Cliente;R$ Programa',
      total = 0,
      i, startDate, endDate;
  startDate = new Date(Number(startDateParam));
  endDate = new Date(Number(endDateParam));
  Hospedagem.find({ empresa: empresa, data_checkout: { $gte: startDate, $lte: endDate } }, { empresa: 0 })
    .exec(function(err, hospedagens) {
    if(hospedagens && hospedagens.length > 0) {
      for (i = 0; i < hospedagens.length; i++) {
        text += '\n' + hospedagens[i].nome + ';' +
                       getDate(hospedagens[i].data_checkin) + ';' +
                       getDate(hospedagens[i].data_checkout) + ';' +
                       toReal(hospedagens[i].pontos) + ';' +
                       toReal(hospedagens[i].pontos * 2);
        total += hospedagens[i].pontos;
      }
    }
    text += '\nTotal;;;' +
      toReal(total) + ';' + toReal(total * 2);
    res.setHeader('Content-disposition', 'attachment; filename=relatorio.csv');
    res.setHeader('Content-type', 'text/csv');
    res.send(200, text);
  });
};
