var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  _ = require('underscore');

var UserSchema = new Schema({
  nome: String,
  email: String,
  documento: String,
  hashed_senha: String,
  salt: String
});

UserSchema.virtual('senha').set(function(senha) {
  this._senha = senha;
  this.salt = this.makeSalt();
  this.hashed_senha = this.encryptPassword(senha);
}).get(function() {
  return this._senha;
});

var validatePresenceOf = function(value) {
  return value && value.length;
};

UserSchema.path('nome').validate(function(nome) {
  return nome.length;
}, 'Nome não pode ser vazio');

UserSchema.path('email').validate(function(email) {
  return email.length;
}, 'Email não pode ser vazio');

UserSchema.path('documento').validate(function(documento) {
  return documento.length;
}, 'Documento não pode ser vazio');

UserSchema.path('hashed_senha').validate(function(hashed_senha) {
  return hashed_senha.length;
}, 'Senha não pode ser vazia');

// UserSchema.pre('save', function(next) {
//   if (!this.isNew) return next();

//   if (!validatePresenceOf(this.senha))
//     next(new Error('Senha Inválida'));
// });

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_senha;
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  },
  encryptPassword: function(senha) {
    if (!senha) return '';
      return crypto.createHmac('sha1', this.salt).update(senha).digest('hex');
  }
};

mongoose.model('User', UserSchema, 'user');
