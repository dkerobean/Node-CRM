const express = require('express');
const { addContact } = require('../controllers/contacts/addContact');
const router = express.Router();

// add contacts
router.post('/add', addContact);

module.exports = router;