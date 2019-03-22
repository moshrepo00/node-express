const Event = require('../models/event.model');

//Simple version, without validation or sanitation

exports.event_create = function(req, res, next) {
	let event = new Event({
		url: req.body.url,
		name: req.body.name,
		image: req.body.image,
		date: req.body.date,
		location: req.body.location,
		description: req.body.description
	});

	event.save(function(err) {
		if (err) {
			return next(err);
		}
		res.send('event Created successfully');
	});
};

exports.event_details = function(req, res, next) {
	console.log('the ID in the request', req.params.id);
	Event.findById(req.params.id, function(err, event) {
		if (err) return next(err);
		res.send(event);
	});
};

exports.getevents = function(req, res, next) {
	Event.find({}, function(err, events) {
		if (err) return next(err);
		res.send(events);
	});
};

exports.event_update = function(req, res, next) {
	Event.findByIdAndUpdate(req.params.id, { $set: req.body }, function(err, event) {
		if (err) return next(err);
		res.send('event udpated.');
	});
};

exports.event_delete = function(req, res) {
	Event.findByIdAndRemove(req.params.id, function(err) {
		if (err) return next(err);
		res.send('Deleted successfully!');
	});
};

exports.test = function(req, res) {
	res.send('Greetings from the Test controller!');
};
