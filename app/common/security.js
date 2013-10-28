var crypto = require('crypto'),
  key = 'p4l4vr4s3cr3t4';

function convertCryptKey(strKey) {
  var newKey = new Buffer([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  strKey = new Buffer(strKey);
  for (var i = 0; i < strKey.length; i++)
    newKey[i % 16] ^= strKey[i];
  return newKey;
}

exports.encrypt = function(password) {
  var c = crypto.createCipheriv('aes-128-ecb', convertCryptKey(key), '');
  var crypted = c.update(password, 'utf8', 'hex') + c.final('hex');
  return crypted.toUpperCase();
};

exports.decrypt = function(crypted) {
  var dc = crypto.createDecipheriv('aes-128-ecb', convertCryptKey(key), '');
  var decrypted = dc.update(crypted, 'hex', 'utf8') + dc.final('utf8');
  return decrypted;
};
