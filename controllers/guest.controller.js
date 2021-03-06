const Guest = require('../models/guest.model');
const Event = require('../models/event.model');

//Simple version, without validation or sanitation

exports.guest_create = function(req, res, next) {
	let guest = new Guest({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phone: req.body.phone
	});

	Event.findById(req.params.id, (err, event) => {
		guest.save(function(err) {
			if (err) {
				const err = new Error('Not Found');
				err.status = 404;
				next(err);
			}
			console.log(req.params.id);
			console.log(event);
			event['guests'].push(guest);
			event.save((err) => {
				if (err) console.log(err);
				// res.send('ticket Created successfully', event);
				res.status(200).send(event);
			});
			// event['tickets'].push(ticket);
			// event.save();
			// res.send('ticket Created successfully');
		});
		// console.log('params id', req.params);
		// console.log('event', event);
	});

	// guest.save(function(err) {
	// 	if (err) {
	// 		return next(err);
	// 	}
	// 	res.send('guest Created successfully');
	// });
};

exports.guest_details = function(req, res, next) {
	Guest.findById(req.params.id, function(err, guest) {
		if (err) return next(err);
		res.send(guest);
	});
};

exports.getguests = function(req, res, next) {
	Guest.find({}, function(err, guests) {
		if (err) return next(err);
		res.send(guests);
	});
};

exports.guest_update = function(req, res, next) {
	Guest.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, guest) {
		if (err) return next(err);
		res.send('guest udpated.');
	});
};

exports.guest_delete = function(req, res) {
	Guest.findByIdAndRemove(req.params.id, function(err) {
		if (err) return next(err);
		res.send('Deleted successfully!');
	});
};

exports.test = function(req, res) {
	res.send('Greetings from the Test controller!');
};
