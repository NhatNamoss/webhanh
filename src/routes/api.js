// src/routes/api.js
const express = require('express');
const router = express.Router();
const AuthController = require('../app/controller/AuthController');
const WatchController = require('../app/controller/WatchController');
const auth = require('../app/middleware/auth');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/watch', auth, WatchController.saveHistory);
router.get('/history', auth, WatchController.getHistory);

module.exports = router;
