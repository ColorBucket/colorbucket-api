'use srict';

const UserBusiness = require('../business/user.business'),
      ColorBusiness = require('../business/color.business'),
      TokenBusiness = require('../business/token.business'),
      ResponseFactory = require('../factories/response.factory')
      ObjectId = require('mongoose').Types.ObjectId;

const _responseFactory = new ResponseFactory();
const _userBusiness = new UserBusiness();
const _colorBusiness = new ColorBusiness();

/**
 * Get user
 * @returns {User}
 */
function get(req, res, next) {
  var query = {};
  if(!req.params.userId)
    query._id = req.decoded._id;
  else {
    if(ObjectId.isValid(req.params.userId))
      query._id = req.params.userId;
    else
      query.username = req.params.userId;
  }

  _userBusiness.get(query)
    .then(user => {
      res.json(_responseFactory.success(user[0] ? user[0].toObject() : null));
    })
    .catch(e => next(e));
}

/**
 * Create new user
 * @property {string} req.body.name - The name of user.
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function create(req, res, next) {
  let uservm = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  _userBusiness.create(uservm)
    .then(savedUser => {
      res.json(_responseFactory.success(savedUser.toObject())) 
    })
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.name - The name of user.
 * @property {string} req.body.email - The email of user.
 * @property {string} req.body.password - The password of user.
 * @returns {User}
 */
function update(req, res, next) {
  let user = req.body;
  user.name = req.body.name;
  user.about = req.body.about;

  _userBusiness.update(user)
    .then(savedUser => {
      res.json(_responseFactory.success(user))
    })
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  _userBusiness.remove(req.decoded._id)
    .then(status => {
      const tokenBusiness = new TokenBusiness();

      tokenBusiness.removeByUser(req.decoded._id);

      res.json(_responseFactory.success(status))
    })
    .catch(e => next(e));
}

/**
 * Get user's colors
 * @returns {Colors}
 */
function getColors(req, res, next) {
  _colorBusiness.get({user: req.params.userId})
    .then(colors => {
      res.json(_responseFactory.success(colors));
    })
    .catch(e => next(e));
}

module.exports = { get, getColors, create, update, remove };
