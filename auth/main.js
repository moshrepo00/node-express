const User = require('../models/user.model');
let jwt = require('jsonwebtoken');
let config = require('./config');
let bcrypt = require('bcrypt');

exports.register = function(req, res) {
	var newUser = new User(req.body);
	newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
	newUser.save(function(err, user) {
		if (err) {
			return res.status(400).send({
				message: err
			});
		} else {
			user.hash_password = undefined;
			return res.json(user);
		}
	});
};

exports.sign_in = function(req, res) {
	console.log('req body email', req.body.email);
	User.findOne(
		{
			email: req.body.email
		},
		function(err, user) {
			if (err) throw err;
			if (!user) {
				res.status(401).json({ message: 'Authentication failed. User not found.' });
			} else if (user) {
				console.log(user);
				console.log('compare password', comparePassword);
				if (!comparePassword(req.body.password, user.hash_password)) {
					res.status(401).json({ message: 'Authentication failed. Wrong password.' });
				} else {
					return res.json({
						message: 'Authetication Successful',
						token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, config.secret, {
							expiresIn: '10m'
						})
					});
				}
			}
		}
	);
};

comparePassword = (password, hash) => {
	return bcrypt.compareSync(password, hash);
};

exports.loginRequired = function(req, res, next) {
	if (req.user) {
		next();
	} else {
		return res.status(401).json({ message: 'Unauthorized user!' });
	}
};

//old testing login method for testing
exports.login = (req, res) => {
	let username = req.body.username;
	let password = req.body.password;
	// For the given username fetch user from DB
	let mockedUsername = 'admin';
	let mockedPassword = 'password';

	if (username && password) {
		if (username === mockedUsername && password === mockedPassword) {
			let token = jwt.sign({ username: username }, config.secret, {
				expiresIn: '30m' // expires in 24 hours
			});
			// return the JWT token for the future API calls
			res.json({
				success: true,
				message: 'Authentication successful!',
				token: token
			});
		} else {
			res.send(403).json({
				success: false,
				message: 'Incorrect username or password'
			});
		}
	} else {
		res.send(400).json({
			success: false,
			message: 'Authentication failed! Please check the request'
		});
	}
};
