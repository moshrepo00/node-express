const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const event_controller = require('../controllers/event.controller');

router.post('/create', event_controller.event_create);

// a simple test url to check that all of our files are communicating correctly.

router.get('/all', event_controller.getevents);

router.get('/:id', event_controller.event_details);

router.put('/:id/update', event_controller.event_update);

router.delete('/:id/delete', event_controller.event_delete);

// router.get('/all-events', event_controller.all_events);

router.get('/test', event_controller.test);

module.exports = router;

router.delete('/:id/delete', event_controller.event_delete);
