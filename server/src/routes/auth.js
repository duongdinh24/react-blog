const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/AuthController');

//REGISTER
router.post('/register', authController.register)

//LOGIN
router.post('/login', authController.login);



module.exports = router;
