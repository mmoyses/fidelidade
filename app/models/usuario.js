var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto');

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
  return hashed_senha.length;
}, 'Senha não pode ser vazia');

// UsuarioSchema.pre('save', function(next) {
//   if (!this.isNew) return next();

//   if (!validatePresenceOf(this.senha))
//     next(new Error('Senha Inválida'));
// });

UsuarioSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_senha;
  },
  encryptPassword: function(senha) {
    if (!senha) return '';
      return crypto.createHmac('sha1', this.salt).update(senha).digest('hex');
  }
};

mongoose.model('Usuario', UsuarioSchema, 'usuario');
