const express = require('express');
const router = express.Router({ mergeParams: true });
const middleware = require('../auth/middleware');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const event_controller = require('../controllers/event.controller');

router.post('/create', event_controller.event_create);

// a simple test url to check that all of our files are communicating correctly.

router.get('/all', middleware.checkToken, event_controller.getevents);

router.get('/:id', middleware.checkToken, event_controller.event_details);

router.put('/:id/update', middleware.checkToken, event_controller.event_update);

router.delete('/:id/delete', middleware.checkToken, event_controller.event_delete);

// router.get('/all-events', event_controller.all_events);

router.get('/test', middleware.checkToken, event_controller.test);

module.exports = router;
