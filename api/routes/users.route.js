const express = require('express'),
      validate = require('express-validation'),
      paramValidation = require('../../server-setup/param-validation'),
      userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
  /** GET /api/users - Get user */
  .get(userCtrl.get)

  /** PUT /api/users - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users - Delete user */
  .delete(userCtrl.remove);

router.route('/colors')
  /** GET /api/users/colors - Get user colors */
  .get(userCtrl.getColors);

router.route('/:userId')
  /** GET /api/:userId/users - Get specific user */ 
  .get(userCtrl.get);

router.route('/:userId/colors')
  /** GET /api/users/:userId/colors - Get specific user colors */
  .get(userCtrl.getColors);

module.exports = router;
