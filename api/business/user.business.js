'use strict';
const crypto = require('crypto'),
      Promisse = require('bluebird'),
      config = require('../../config'),
      User = require('../models/user.model'),
      TokenBusiness = require('./token.business');

class UserBusiness {

	constructor() { }

    /*
    * Params could be either a json or a single Id
    */
    get(params) {
        return User.get(params);
    };

    update(uservm) {
        return User.update({_id: uservm._id}, {$set: { name: uservm.name }});
    };

    updatePassword(uservm) {
        let hashPassword = crypto.createHmac('sha256', config.secret)
                               .update(uservm.password)
                               .digest('hex');

        uservm.password = hashPassword;

        return User.update({_id: uservm._id}, {$set: { password: uservm.password }});
    };

    checkPassword(uservm, password) {
        let hashPassword = crypto.createHmac('sha256', config.secret)
                               .update(password)
                               .digest('hex');

       return uservm.password === hashPassword;
    }

    create(uservm) {
        let hashPassword = crypto.createHmac('sha256', config.secret)
                               .update(uservm.password)
                               .digest('hex');

        uservm.password = hashPassword;

        return User.create(uservm);
    };

    remove(id) {
        let tokenBusiness = new TokenBusiness();

        return User.delete({_id: id})
                .then(status => {
                  return tokenBusiness.removeByUser(id);
                });
    };
}

module.exports = UserBusiness;