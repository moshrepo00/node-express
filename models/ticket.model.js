const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TicketSchema = new Schema({
	name: { type: String, required: true },
	available: { type: Number, required: true }
});

// Export the model
module.exports = mongoose.model('Ticket', TicketSchema);
