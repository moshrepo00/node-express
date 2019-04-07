const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GuestSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true }
});

// Export the model
module.exports = mongoose.model('Guest', GuestSchema);
