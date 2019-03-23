const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const guest_controller = require('../controllers/guest.controller');

router.post('/create', guest_controller.guest_create);

// a simple test url to check that all of our files are communicating correctly.

router.get('/all', guest_controller.getguests);

router.get('/:id', guest_controller.guest_details);

router.put('/:id/update', guest_controller.guest_update);

router.delete('/:id/delete', guest_controller.guest_delete);

// router.get('/all-guests', guest_controller.all_guests);

router.get('/test', guest_controller.test);

module.exports = router;
