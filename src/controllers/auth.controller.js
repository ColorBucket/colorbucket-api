import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import crypto from 'crypto';
import APIError from '../helpers/APIError';
import User from '../models/user.model';
import ResponseFactory from '../factories/responseFactory'


const _responseFactory = new ResponseFactory();
const config = require('../../config/env');


/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {

  User.get({username: req.body.username})
    .then(users => {
      const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED);
      
      let user = users[0];

      if(!user)
        return next(err);

      let hashPassword = crypto.createHmac('sha256', config.jwtSecret)
                         .update(req.body.password)
                         .digest('hex');

      if(user.password == hashPassword) {
        const token = jwt.sign({
          username: user.username,
          _id: user._id
        }, config.jwtSecret);
        
        return res.json(_responseFactory.sucess({
          token,
          username: user.username
        }));
      }

      return next(err);
    })
    .catch(e => next(e));
}

/**
 * Returns jwt token if valid signup
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function signup(req, res, next) {
  const user = new User({
    name:  req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    about: req.body.about
  });

  let hashPassword = crypto.createHmac('sha256', config.jwtSecret)
                       .update(user.password)
                       .digest('hex');

  user.password = hashPassword;

  user.save()
    .then(savedUser => {
      const token = jwt.sign({
        username: savedUser.username,
        _id: user._id
      }, config.jwtSecret);

      res.json(_responseFactory.sucess({
        token,
        user: savedUser
      }));
    })
    .catch(e => next(e));
}

export default { login, signup };
