'use strict'

const config = require('../config'),
	  ResponseFactory = require('../api/factories/response.factory'),
	  TokenBusiness = require('../api/business/token.business');

const _responseFactory = new ResponseFactory();
const _tokenBusiness = new TokenBusiness();

function intercept(req, res, next) {
	if(config.unsecuredRoutes.indexOf(req.path) >= 0)
		return next();

	if(!req.headers['authorization-token'])
		return res.status(403).send(_responseFactory.fail(-1, "No Token presented"));

	let token = req.headers['authorization-token'];

	_tokenBusiness.get(token)
		.then(tokenData => {
			if(!tokenData || new Date() > tokenData.expire)
				return res.status(403).send(_responseFactory.fail(-1, "Ivalid Token"));

			_tokenBusiness.refresh(tokenData);
			req.decoded = { _id: tokenData.user_id.toString() };
			
			next();
		})
		.catch(err => {
			return res.status(500).send(_responseFactory.fail(-1, err.message));
		});
}

module.exports = intercept;