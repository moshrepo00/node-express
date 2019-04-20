const express = require('express');
const router = express.Router({ mergeParams: true });
const middleware = require('../auth/middleware');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const guest_controller = require('../controllers/guest.controller');

router.post('/create', middleware.checkToken, guest_controller.guest_create);

// a simple test url to check that all of our files are communicating correctly.

router.get('/all', middleware.checkToken, guest_controller.getguests);

router.get('/:id', middleware.checkToken, guest_controller.guest_details);

router.put('/:id/update', middleware.checkToken, guest_controller.guest_update);

router.delete('/:id/delete', middleware.checkToken, guest_controller.guest_delete);

// router.get('/all-guests', guest_controller.all_guests);

router.get('/test', middleware.checkToken, guest_controller.test);

module.exports = router;
