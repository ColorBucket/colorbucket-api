const express = require('express'),
      validate = require('express-validation'),
      paramValidation = require('../../server-setup/param-validation'),
      authCtrl = require('../controllers/auth.controller'),
      config = require('../../config');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

/** POST /api/signup - Returns token if successfull signup*/
router.route('/signup')
  .post(validate(paramValidation.signup), authCtrl.signup);

module.exports = router;
