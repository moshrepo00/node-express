const express = require('express');
const router = express.Router({ mergeParams: true });

const auth_controller = require('./main');

router.post('/', auth_controller.login);

module.exports = router;
