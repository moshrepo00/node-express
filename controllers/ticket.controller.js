const Ticket = require('../models/ticket.model');
const Event = require('../models/event.model');

//Simple version, without validation or sanitation

exports.ticket_create = function(req, res, next) {
	let ticket = new Ticket({
		name: req.body.name,
		available: req.body.available
	});

	// ticket.save(function(err) {
	// 	if (err) {
	// 		return next(err);
	// 	}
	// 	// event['tickets'].push(ticket);
	// 	// event.save();
	// 	// res.send('ticket Created successfully');
	// });
	Event.findById(req.params.id, (err, event) => {
		ticket.save(function(err) {
			if (err) {
				const err = new Error('Not Found');
				err.status = 404;
				next(err);
			}
			// event['tickets'].push(ticket);
			// event.save();
			// res.send('ticket Created successfully');
			event['tickets'].push(ticket);
			event.save((err) => {
				if (err) console.log(err);
				// res.send('ticket Created successfully', event);
				res.status(200).send(event);
			});
		});
		// console.log('params id', req.params);
		// console.log('event', event);
	});
};

exports.ticket_details = function(req, res, next) {
	Ticket.findById(req.params.id, function(err, ticket) {
		if (err) return next(err);
		res.send(ticket);
	});
};

exports.gettickets = function(req, res, next) {
	Ticket.find({}, function(err, tickets) {
		if (err) return next(err);
		res.status(200).send(ticket);
	});
};

exports.ticket_update = function(req, res, next) {
	Ticket.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, ticket) {
		if (err) return next(err);
		res.end();
	});
};

exports.update_multiple_tickets = (req, res, next) => {};

exports.ticket_delete = function(req, res) {
	Ticket.findByIdAndRemove(req.params.id, function(err) {
		if (err) return next(err);
		res.send('Deleted successfully!');
	});
};

exports.test = function(req, res) {
	res.send('Greetings from the Test controller!');
};
