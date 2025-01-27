const express = require('express');
const router = express.Router();
const usersController = require('../controller/usersController');

// Ruta para el login
router.post('/login', usersController.loginUser);

module.exports = router;