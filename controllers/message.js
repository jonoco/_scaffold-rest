const db = require('../db');

/*
	Create a new message

	body:
		message (string) - text of the message to post

	returns:
		message (object) - the message object created
*/

exports.postMessage = function (req, res, next) {
	const { message } = req.body;

	if (!message) return res.status(422).json({ error: 'You must provide a message' });

	db.message
		.create({ text: message })
		.then(msg => {
			res.json({ message: msg });
		})
		.catch(err => {
			res.status(500).json({ error: err });
		});
}

/*
	Retrieves all messages

	returns:
		messages ([object]) - array of all message objects
*/
exports.getMessages = function (req, res, next) {
	db.message
		.findAll()
		.then(messages => {
			res.json({ messages })
		})
		.catch(err => {
			res.status(500).json({ error : err });
		});
}