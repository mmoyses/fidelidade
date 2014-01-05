var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  security = require('../common/security');

var UsuarioSchema = new Schema({
  nome: String,
  email: String,
  username: String,
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

UsuarioSchema.path('nome').validate(function(nome) {
  return nome.length;
}, 'Campo nome não pode ser vazio');

UsuarioSchema.path('email').validate(function(email) {
  return email.length;
}, 'Campo email não pode ser vazio');

UsuarioSchema.path('hashed_password').validate(function(hashed_password) {
  return hashed_password.length;
}, 'Campo senha não pode ser vazio');

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

UsuarioSchema.index({ username: 1 });
UsuarioSchema.set('autoIndex', true);

mongoose.model('Usuario', UsuarioSchema, 'usuario');
