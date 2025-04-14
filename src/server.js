const express=require('express');
const app = express();
const morgan = require('morgan');
const port = process.env.PORT || 3000;
const path = require("path");
const handlebars = require("express-handlebars");
const methodOverride = require('method-override');
const routes = require('./routes');
const { equal } = require('assert');

// src/routes/api.js
const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthController');
const WatchController = require('../app/controllers/WatchController');
const auth = require('../app/middleware/auth');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/watch', auth, WatchController.saveHistory);
router.get('/history', auth, WatchController.getHistory);

module.exports = router;

// config express to use morgan
app.use(morgan('combined'));

// config express to use static files
app.use(express.static(path.join(__dirname, "resources")));
app.use(methodOverride('_method'));

// Template Engine
app.engine("hbs", handlebars.engine({ 
  extname: ".hbs",
  helpers:{
    gt: (a, b) => a > b,
    lt: (a, b) => a < b,
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    eq: (a, b) => a == b,
    sum: (a,b) => a+b,
} }));
app.set("view engine", "hbs");
app.set('views', path.join(__dirname, 'resources/views')); 

// config express to serve static files
app.use(express.urlencoded({ extended: true }));
routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});