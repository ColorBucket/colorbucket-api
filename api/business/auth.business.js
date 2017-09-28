'use strict';
const bcrypt = require('bcryptjs'),
      saltRounds = 10,
      crypto = require('crypto'),
      config = require('../../config');

class AuthBusiness {
  constructor() {}

  createPasswordResetCode(email) {
    const cipher = crypto.createCipher('aes192', config.secret);
    
    let hashData = {
      email: email,
      expiration: new Date().getTime() + 600000 // ten minutes
    };

    let parsedData = JSON.stringify(hashData);
    
    let encrypted = cipher.update(parsedData, 'utf8', 'hex');
        encrypted += cipher.final('hex');
    
    return encrypted;
  }

  fetchPasswordResetCode(hash) {
    const decipher = crypto.createDecipher('aes192', config.secret);
    
    let decrypted = decipher.update(hash, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    let hashData = JSON.parse(decrypted);

    return hashData;
  }
}

module.exports = AuthBusiness;
