const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const GuestSchema = require('../models/guest.model').schema;

let EventSchema = new Schema({
	url: { type: String, required: true },
	name: { type: String, required: true },
	image: { type: String, required: true },
	date: { type: Number, required: true },
	location: { type: String, required: true },
	description: { type: String, required: true },
	guests: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Guest'
		}
	],
	tickets: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Ticket'
		}
	]
});

// Export the model
module.exports = mongoose.model('Event', EventSchema);
