const express = require('express');
const { addContact } = require('../controllers/contacts/addContact');
const { editContact } = require('../controllers/contacts/editContact');
const router = express.Router();

// add contacts
router.post('/add', addContact);

// edit contacts
router.put('/edit/:id', editContact);
module.exports = router;