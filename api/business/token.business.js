'use strict';
const Promisse = require('bluebird'),
      Token = require('../models/token.model');

class TokenBusiness {

	constructor() { }

    get(token) {
        return Token.get(token);
    };

    refresh(tokenvm) {
        let today = new Date().getTime();

        tokenvm.expire = new Date(today + 36000000);
        
        return Token.findOneAndUpdate({_id: tokenvm._id}, tokenvm);
    };

    /*
    * tokenvm could be either a complete token json or a single user Id
    */
    create(tokenvm) {
        if(typeof(params) != 'object') {
            let today = new Date().getTime();            
            tokenvm = {
                user_id: tokenvm,
                expire: new Date(today + 36000000)
            };
        }

        return Token.create(tokenvm);
    };

    removeByUser(user_id) {
        return Token.delete({ user_id: user_id });
    };
}

module.exports = TokenBusiness;