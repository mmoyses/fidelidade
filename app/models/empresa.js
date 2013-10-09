var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var tipoEmpresa = 'hotel super'.split(' ');

var EmpresaSchema = new Schema({
  nome: String,
  ativa: Boolean,
  tipo: { type: String, enum: tipoEmpresa, default: 'hotel' },
  textoVoucher: String,
  pontuacao: Number
});

mongoose.model('Empresa', EmpresaSchema, 'empresa');
