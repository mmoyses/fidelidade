var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  security = require('../common/security');

var ResgateSchema = new Schema({
  _id: false,
  id: false,
  data_resgate: Date,
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
  hashed_password: String,
  empresa: String,
  data_cadastro: Date,
  quarto: String,
  observacoes: String,
  pontos: Number,
  hospedagens: [{ type: Schema.Types.ObjectId, ref: 'Hospedagem' }],
  resgates: [ResgateSchema]
});

ClienteSchema.virtual('senha').set(function(senha) {
  this._senha = senha;
  this.hashed_password = this.encryptPassword(senha);
}).get(function() {
  return this._senha;
});

ClienteSchema.path('nome').validate(function(nome) {
  return nome.length;
}, 'Campo nome não pode ser vazio');

ClienteSchema.path('documento').validate(function(documento) {
  return documento.length;
}, 'Campo documento não pode ser vazio');

ClienteSchema.path('email').validate(function(email) {
  return email.length;
}, 'Campo email não pode ser vazio');

ClienteSchema.path('endereco').validate(function(endereco) {
  return endereco.length;
}, 'Campo endereço não pode ser vazio');

ClienteSchema.path('cidade').validate(function(cidade) {
  return cidade.length;
}, 'Campo cidade não pode ser vazio');

ClienteSchema.path('estado').validate(function(estado) {
  return estado.length;
}, 'Campo estado não pode ser vazio');

ClienteSchema.path('cep').validate(function(cep) {
  return cep.length;
}, 'Campo CEP não pode ser vazio');

ClienteSchema.path('hashed_password').validate(function(hashed_password) {
  return hashed_password.length;
}, 'Campo senha não pode ser vazio');

ClienteSchema.methods = {
  authenticate: function(plainText) {
    return security.encrypt(plainText) === this.hashed_password;
  },
  encryptPassword: function(senha) {
    if (!senha)
      return '';
    return security.encrypt(senha);
  },
  decryptPassword: function() {
    return security.decrypt(this.hashed_password);
  }
};

ClienteSchema.index({ email: 1 });
ClienteSchema.set('autoIndex', true);

mongoose.model('Cliente', ClienteSchema, 'cliente');
