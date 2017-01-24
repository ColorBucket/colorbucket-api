import Joi from 'joi';

export default {
  // POST /users
  createUser: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // UPDATE /users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /auth/signup
  signup: {
    body: {
      username: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /color
  createColor: {
    body: {
      color: Joi.string().required()
    }
  },

  // DELETE /color
  deleteColor: {
    body: {
      color: Joi.string().required()
    }
  }
};
