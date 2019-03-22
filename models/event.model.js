const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EventSchema = new Schema({
	url: { type: String, required: true },
	name: { type: String, required: true },
	image: { type: String, required: true },
	date: { type: Number, required: true },
	location: { type: String, required: true },
	description: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('Event', EventSchema);
