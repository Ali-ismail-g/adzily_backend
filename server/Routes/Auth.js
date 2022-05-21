const express = require('express');
const authController = require('../Controllers/UserAuth');
const router = express.Router();

//signup
router.post('/signup', authController.signup);
//login
router.post('/signin', authController.signin);

module.exports = router;