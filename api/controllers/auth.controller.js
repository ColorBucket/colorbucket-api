'use srict';

const httpStatus = require('http-status'),
      APIError = require('../helpers/APIError'),
      UserBusiness = require('../business/user.business'),
      TokenBusiness = require('../business/token.business'),
      ResponseFactory = require('../factories/response.factory');

const _responseFactory = new ResponseFactory();


/**
 * Returns token + user if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    const userBusiness = new UserBusiness();
    const tokenBusiness = new TokenBusiness();

    userBusiness.get({
        email: req.body.email
    })
    .then(vm => {
        const err = new APIError('Invalid Email/Password', httpStatus.UNAUTHORIZED);

        if(!vm || vm.length == 0)
            return next(err);

        if(!userBusiness.checkPassword(vm[0], req.body.password))
            return next(err);

        tokenBusiness.create(vm[0]._id)
            .then(token => {
                res.json(_responseFactory.success({
                    token: token._id,
                    user: vm[0].toObject()
                }));
            }).catch(e => next(e));
    })
    .catch(e => next(e));
}

/**
 * Returns token + user if valid signup
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function signup(req, res, next) {
    const userBusiness = new UserBusiness();
    const tokenBusiness = new TokenBusiness();
    const userModel = {
        name:  req.body.name,
        username:  req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    userBusiness.create(userModel)
        .then(uservm => {
            tokenBusiness.create(uservm._id)
            .then(token => {
                res.json(_responseFactory.success({
                    token: token._id,
                    user: uservm.toObject()
                }));
            })
            .catch(e => next(e));    
        })
        .catch(e => {
          let message = 'Unexpected Error occured, please report on Github!';
          
          if(e.message.indexOf('duplicate key') > -1 && e.message.indexOf('email') > -1)
            message = 'Ops, email already in use!';

          if(e.message.indexOf('duplicate key') > -1 && e.message.indexOf('username') > -1)
            message = 'Ops, username already taken!';

          return res.json(_responseFactory.fail(-1, message));
        });
}

module.exports = { login, signup };
