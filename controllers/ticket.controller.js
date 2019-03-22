const Ticket = require('../models/ticket.model');

//Simple version, without validation or sanitation

exports.ticket_create = function(req, res, next) {
	let ticket = new Ticket({
		name: req.body.name,
		available: req.body.available
	});

	ticket.save(function(err) {
		if (err) {
			return next(err);
		}
		res.send('ticket Created successfully');
	});
};

exports.ticket_details = function(req, res, next) {
	console.log('the ID in the request', req.params.id);
	Ticket.findById(req.params.id, function(err, ticket) {
		if (err) return next(err);
		res.send(ticket);
	});
};

exports.gettickets = function(req, res, next) {
	Ticket.find({}, function(err, tickets) {
		if (err) return next(err);
		res.send(tickets);
	});
};

exports.ticket_update = function(req, res, next) {
	Ticket.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, ticket) {
		if (err) return next(err);
		res.send('ticket udpated.');
	});
};

exports.ticket_delete = function(req, res) {
	Ticket.findByIdAndRemove(req.params.id, function(err) {
		if (err) return next(err);
		res.send('Deleted successfully!');
	});
};

exports.test = function(req, res) {
	res.send('Greetings from the Test controller!');
};
