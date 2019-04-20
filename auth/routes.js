const express = require('express');
const router = express.Router({ mergeParams: true });

const auth_controller = require('./main');

router.post('/login', auth_controller.login);

router.post('/register', auth_controller.register);

router.post('/sign_in', auth_controller.sign_in);

module.exports = router;
