const Joi = require('joi');

module.exports = {

  // UPDATE /api/password/update
  updatePassword: {
    body: {
      recoveryCode: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/password/recovery
  passwordRecovery: {
    body: {
      email: Joi.string().required()
    }
  },

  // UPDATE /api/user
  updateUser: {
    body: {
      name: Joi.string().required(),
      password: Joi.string()
    }
  },

  // POST /api/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/signup
  signup: {
    body: {
      name: Joi.string().required(),
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },


  ///// Colors
  // CREATE /api/colors
  createColor: {
    body: {
      user: Joi.string().required(),
      hex: Joi.string().required()
    }
  },

  // UPDATE /api/colors
  updateColor: {
    body: {
      _id: Joi.string().required(),
      name: Joi.string().required()
    }
  }
};
