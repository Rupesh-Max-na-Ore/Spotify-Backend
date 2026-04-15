const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);

// logout route for users to clear the token cookie and log out
// in production, token blacklisting is used
router.post('/logout', authController.logoutUser);

module.exports = router;