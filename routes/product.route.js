const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');

router.post('/create', product_controller.product_create);

// a simple test url to check that all of our files are communicating correctly.

router.get('/all', product_controller.getProducts);

router.get('/:id', product_controller.product_details);

// router.get('/all-products', product_controller.all_products);

router.get('/test', product_controller.test);

module.exports = router;
