const express = require('express');
const { getUsers } = require('../controllers/userController');
const router = express.Router();
const { loginUser, registerOrganization } = require('../controllers/authController')

// Define the /api/users route
router.get('/users', getUsers);

// Route for registering an organization
router.post('/register', registerOrganization);

// Route for logging in
router.post('/login', loginUser);

// Route for email verification
router.get('/verify-email', verifyEmail);

module.exports = router;
