'use srict';

const httpStatus = require('http-status'),
      APIError = require('../helpers/APIError'),
      UserBusiness = require('../business/user.business'),
      TokenBusiness = require('../business/token.business'),
      AuthBusiness = require('../business/auth.business'),
      MailBusiness = require('../business/mail.business'),
      ResponseFactory = require('../factories/response.factory');

const _responseFactory = new ResponseFactory();


/**
 * Returns token + user if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
	const userBusiness = new UserBusiness();
	const tokenBusiness = new TokenBusiness();

	userBusiness.get({
		email: req.body.email
	})
	.then(vm => {
		const err = new APIError('Invalid Email/Password', httpStatus.UNAUTHORIZED);

		if(!vm || vm.length == 0)
			return next(err);

		if(!userBusiness.checkPassword(vm[0], req.body.password))
			return next(err);

		tokenBusiness.create(vm[0]._id)
			.then(token => {
				res.json(_responseFactory.success({
					token: token._id,
					user: vm[0].toObject()
				}));
			}).catch(e => next(e));
	})
	.catch(e => next(e));
}

/**
 * Returns token + user if valid signup
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function signup(req, res, next) {
	const userBusiness = new UserBusiness();
	const tokenBusiness = new TokenBusiness();
	const userModel = {
		name:  req.body.name,
		username:  req.body.username,
		email: req.body.email,
		password: req.body.password
	};

	userBusiness.create(userModel)
		.then(uservm => {
			tokenBusiness.create(uservm._id)
			.then(token => {
				res.json(_responseFactory.success({
					token: token._id,
					user: uservm.toObject()
				}));
			})
			.catch(e => next(e));    
		})
		.catch(e => {
			let message = 'Unexpected Error occured, please report on Github!';
			
			if(e.message.indexOf('duplicate key') > -1 && e.message.indexOf('email') > -1)
				message = 'Ops, email already in use!';

			if(e.message.indexOf('duplicate key') > -1 && e.message.indexOf('username') > -1)
				message = 'Ops, username already taken!';

			return res.json(_responseFactory.fail(-1, message));
		});
}


/**
 * Returns status of recovery email sent
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function recovery(req, res, next) {
	const userBusiness = new UserBusiness();
	const authBusiness = new AuthBusiness();
	const mailBusiness = new MailBusiness();

	userBusiness.get({email: req.body.email})
		.then((users) => {
			if(!users || users.length == 0)
				return res.json(_responseFactory.success('Email sent'));

			let resetHash = authBusiness.createPasswordResetCode(req.body.email);
			mailBusiness.sendRecoveryEmail(req.body.email, resetHash);

			return res.json(_responseFactory.success('Email sent'));
		})
		.catch(err => next(err));
}

/**
 * Returns status of password updation
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function passwordUpdate(req, res, next) {
	const userBusiness = new UserBusiness();
	const authBusiness = new AuthBusiness();

	let hashData = authBusiness.fetchPasswordResetCode(req.body.recoveryCode);
	
	if(new Date().getTime() > hashData.expiration)
		return res.json(_responseFactory.fail(-1, 'Your recovery link has expired'));

	userBusiness.get({email: hashData.email})
		.then((users) => {
			users[0].password = req.body.password;
			userBusiness.updatePassword(users[0])
				.then((data) => {
					res.json(_responseFactory.success(null));
				})
				.catch(err => next(err));
		})
		.catch(err => next(err));
}

module.exports = { login, signup, recovery, passwordUpdate };
