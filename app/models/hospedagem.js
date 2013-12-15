var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var HospedagemSchema = new Schema({
  empresa: { type: Schema.Types.ObjectId, ref: 'Empresa' },
  data_checkin: Date,
  data_checkout: Date,
  pontos: Number,
  cliente: String,
  nome: String
});

mongoose.model('Hospedagem', HospedagemSchema, 'hospedagem');
