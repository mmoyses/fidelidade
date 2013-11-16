var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var tipoEmpresa = 'hotel super'.split(' ');

var EmpresaSchema = new Schema({
  _id: String,
  nome: String,
  ativa: Boolean,
  tipo: { type: String, enum: tipoEmpresa, default: 'hotel' },
  textoVoucher: String,
  pontuacao: Number,
  imagem: String
});

mongoose.model('Empresa', EmpresaSchema, 'empresa');
