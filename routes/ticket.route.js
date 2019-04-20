const express = require('express');
const router = express.Router({ mergeParams: true });
const middleware = require('../auth/middleware');

// Require the controllers WHICH WE DID NOT CREATE YET!!
const ticket_controller = require('../controllers/ticket.controller');

router.post('/create', middleware.checkToken, ticket_controller.ticket_create);

// a simple test url to check that all of our files are communicating correctly.

router.get('/all', middleware.checkToken, ticket_controller.gettickets);

router.get('/:id', middleware.checkToken, ticket_controller.ticket_details);

router.put('/:id/update', middleware.checkToken, ticket_controller.ticket_update);

router.delete('/:id/delete', middleware.checkToken, ticket_controller.ticket_delete);

// router.get('/all-tickets', ticket_controller.all_tickets);

router.get('/test', middleware.checkToken, ticket_controller.test);

module.exports = router;
