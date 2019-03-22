// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// initialize our express app
const product = require('./routes/product.route'); // Imports routes for the products
const event = require('./routes/event.route'); // Imports routes for the products

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');

// Set up mongoose connection
let dev_db_url = 'mongodb+srv://mos:test@cluster0-cgltt.mongodb.net/test?retryWrites=true';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.user(bodyParser.json());
// after the code that uses bodyParser and other cool stuff
var originsWhitelist = [
	'http://localhost:4200', //this is my front-end url for development
	'http://www.myproductionurl.com'
];
var corsOptions = {
	origin: function(origin, callback) {
		var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
		callback(null, isWhitelisted);
	},
	credentials: true
};
//here is the magic
app.use(cors(corsOptions));

app.use('/products', product);
app.use('/events', event);

let port = 8000;

app.listen(port, () => {
	console.log('Server is up and running on port number ' + port);
});
