const db  = require('../db');
const jwt = require('jwt-simple');
const KEY = process.env.KEY;

function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat:timestamp }, KEY);
}

/*
	Signup a new user

	body:
		username (string)
		password (string)

	returns:
		token (string)
		username (string)
*/
exports.signup = function (req, res, next) {
	const { username, password } = req.body;

	if (!username || !password) return res.status(422).json({error: 'You must provide a username and password'});

	db.user
		.findOrCreate(
			{ where: { username, password } }
		)
		.spread((user, created) => {
			if (!created) return res.status(422).json({error: 'Username already taken'});

			res.json({
				token: tokenForUser(user),
				username: user.username
			});
		})
		.catch( e => {
			res.status(500).json({error: e.message});
		});
}

/*
	Log in an existing user

	body:
		username (string)
		password (string)

	returns:
		token (string)
		username (string)
*/
exports.login = function (req, res, next) {
	res.json({
		token: tokenForUser(req.user),
		username: req.user.username
	});
}