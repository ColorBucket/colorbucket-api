const Joi = require('joi');

module.exports = {

  // UPDATE /password/update
  updatePassword: {
    body: {
      recoveryCode: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /password/recovery
  passwordRecovery: {
    body: {
      email: Joi.string().required()
    }
  },

  // UPDATE /user
  updateUser: {
    body: {
      name: Joi.string().required(),
      about: Joi.string(),
      password: Joi.string()
    }
  },

  // POST /login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /signup
  signup: {
    body: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },


  ///// Colors
  // CREATE /colors
  createColor: {
    body: {
      user: Joi.string().required(),
      hex: Joi.string().required()
    }
  },

  // UPDATE /colors
  updateColor: {
    body: {
      _id: Joi.string().required(),
      name: Joi.string().required()
    }
  }
};
