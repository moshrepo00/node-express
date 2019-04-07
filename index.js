// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// initialize our express app
const product = require('./routes/product.route'); // Imports routes for the products
const ticket = require('./routes/ticket.route'); // Imports routes for the products
const guest = require('./routes/guest.route'); // Imports routes for the products
const event = require('./routes/event.route'); // Imports routes for the products

const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');

// Set up mongoose connection
let dev_db_url = 'mongodb+srv://mos:test@cluster0-cgltt.mongodb.net/event-ticketing-database?retryWrites=true';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app.user(bodyParser.json());
// after the code that uses bodyParser and other cool stuff
// var originsWhitelist = [
// 	'http://localhost:4200', //this is my front-end url for development
// 	'http://www.angular-event.herokuapp.com',
// 	'https://www.angular-event.herokuapp.com'
// ];
// var corsOptions = {
// 	origin: function(origin, callback) {
// 		var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
// 		callback(null, isWhitelisted);
// 	},
// 	credentials: true
// };
// //here is the magic
// app.use(cors(corsOptions));
app.use(function(req, res, next) {
	var allowedOrigins = [
		'http://localhost:4200',
		'https://angular-event.herokuapp.com',
		'https://angular-event.herokuapp.com/'
	];
	var origin = req.headers.origin;
	if (allowedOrigins.indexOf(origin) > -1) {
		res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
	}
	//res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.header('Access-Control-Allow-Credentials', true);
	return next();
});
app.use('/products', product);
app.use('/events', event);
app.use('/events/:id/tickets', ticket);
app.use('/events/:id/guests', guest);
app.get('/', (req, res) => {
	res.send('Event ticketing server!');
});
let port = 8000;

app.listen(process.env.PORT || 8000, () => {
	console.log('server is up and running on port 8000');
});
// app.listen(process.env.PORT || port, () => {
// 	console.log('Server is up and running on port number ' + port);
// });
