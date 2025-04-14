const express = require('express');
const router = express.Router();
const homeController = require('../app/controller/HomeController');
const AuthController = require('../app/controller/AuthController'); // Import AuthController

// Define routes
router.get('/', homeController.index);
router.get('/phim/:slug', homeController.slug);
router.get('/phim/:slug/:name', homeController.tap);
router.get('/search', homeController.search);
router.get('/the-loai/:slug', homeController.theloai);

// Routes for login and register
router.post('/register', AuthController.register); // Register route
router.post('/login', AuthController.login);       // Login route

module.exports = router;