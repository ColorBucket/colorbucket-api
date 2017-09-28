const express = require('express'),
      validate = require('express-validation'),
      paramValidation = require('../../server-setup/param-validation'),
      authCtrl = require('../controllers/auth.controller'),
      config = require('../../config');

const router = express.Router(); // eslint-disable-line new-cap

/** POST /login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

/** POST /signup - Returns token if successfull signup*/
router.route('/signup')
  .post(validate(paramValidation.signup), authCtrl.signup);

/** POST /password/recovery - Returns status of recovery email*/
router.route('/password/recovery')
.post(validate(paramValidation.passwordRecovery), authCtrl.recovery);

/** POST /password/update - Returns status of password update*/
router.route('/password/update')
.post(validate(paramValidation.updatePassword), authCtrl.passwordUpdate);

module.exports = router;
