'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	hash_password: { type: String, required: true }
});

UserSchema.methods.comparePassword = (password, hash) => {
	console.log('schema', console.log(this));
	return bcrypt.compareSync(password, hash);
};

// Export the model
module.exports = mongoose.model('User', UserSchema);
