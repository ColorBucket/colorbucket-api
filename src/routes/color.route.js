import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import colorCtrl from '../controllers/color.controller';

const router = express.Router();

/** POST /color/ - Adds a new color **/
/** GET /color/ - Fetch all the colors **/
/** DELETE /color/ - Delete given hex from user repo **/
router.route('/')
	.get(colorCtrl.list)
	.post(validate(paramValidation.createColor), colorCtrl.create)
	.delete(validate(paramValidation.deleteColor), colorCtrl.remove);

export default router;