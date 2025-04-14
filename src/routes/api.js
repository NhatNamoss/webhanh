// src/routes/api.js
const express = require('express');
const router = express.Router();
const AuthController = require('../app/controller/AuthController');

// Route đăng ký
router.post('/register', AuthController.register);

// Route đăng nhập
router.post('/login', AuthController.login);

module.exports = router;
