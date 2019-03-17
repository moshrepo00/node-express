const Product = require('../models/product.model');

//Simple version, without validation or sanitation

exports.product_create = function(req, res, next) {
	let product = new Product({
		name: req.body.name,
		price: req.body.price
	});

	product.save(function(err) {
		if (err) {
			return next(err);
		}
		res.send('Product Created successfully');
	});
};

exports.product_details = function(req, res, next) {
	console.log('the ID in the request', req.params.id);
	Product.findById(req.params.id, function(err, product) {
		if (err) return next(err);
		res.send(product);
	});
};

exports.getProducts = function(req, res, next) {
	Product.find({}, function(err, products) {
		if (err) return next(err);
		res.send(products);
	});
};

exports.test = function(req, res) {
	res.send('Greetings from the Test controller!');
};
