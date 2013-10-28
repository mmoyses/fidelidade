var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  security = require('../common/security');

var UsuarioSchema = new Schema({
  nome: String,
  email: String,
  hashed_password: String,
  ultimoAcesso: Date,
  gerente: Boolean,
  admin: Boolean,
  empresa: { type: Schema.Types.ObjectId, ref: 'Empresa' }
});

UsuarioSchema.virtual('senha').set(function(senha) {
  this._senha = senha;
  this.hashed_password = this.encryptPassword(senha);
}).get(function() {
  return this._senha;
});

var validatePresenceOf = function(value) {
  return value && value.length;
};

UsuarioSchema.path('nome').validate(function(nome) {
  return nome.length;
}, 'Nome não pode ser vazio');

UsuarioSchema.path('email').validate(function(email) {
  return email.length;
}, 'Email não pode ser vazio');

UsuarioSchema.path('hashed_password').validate(function(hashed_password) {
  return hashed_password.length;
}, 'Senha não pode ser vazia');

UsuarioSchema.methods = {
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

mongoose.model('Usuario', UsuarioSchema, 'usuario');
