var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var HospedagemSchema = new Schema({
  _id: false,
  id: false,
  empresa: { type: Schema.Types.ObjectId, ref: 'Empresa' },
  dataCheckin: Date,
  dataCheckout: Date,
  pontos: Number
});

var ResgateSchema = new Schema({
  _id: false,
  id: false,
  dataResgate: Date,
  pontos: Number
});

var ClienteSchema = new Schema({
  _id: String,
  nome: String,
  documento: String,
  endereco: String,
  cidade: String,
  estado: String,
  bairro: String,
  cep: String,
  telefone: String,
  celular: String,
  email: String,
  empresa: String,
  dataCadastro: Date,
  quarto: String,
  observacoes: String,
  pontos: Number,
  hospedagens: [HospedagemSchema],
  resgates: [ResgateSchema]
});

mongoose.model('Cliente', ClienteSchema, 'cliente');
