const express = require('express'),
      validate = require('express-validation'),
      paramValidation = require('../../server-setup/param-validation'),
      colorCtrl = require('../controllers/color.controller');

const router = express.Router();

router.route('/')
  /** GET /api/colors - Get color by id */
  .get(colorCtrl.get)

  /** POST /api/colors - Create new color */
  .post(validate(paramValidation.createColor), colorCtrl.create)

  /** PUT /api/colors - Update color */
  .put(validate(paramValidation.updateColor), colorCtrl.update)

  /** DELETE /api/colors - Delete color */
  .delete(colorCtrl.remove);

module.exports = router;
