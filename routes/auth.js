const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/auth');

// REGISTER ROUTE
router.post('/register', register);

// LOGIN ROUTE
router.post('/login', login);

module.exports = router;