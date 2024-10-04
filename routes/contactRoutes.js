const express = require('express');
const { addContact } = require('../controllers/contacts/addContact');
const { editContact } = require('../controllers/contacts/editContact');
const { getAllContacts } = require('../controllers/contacts/allContacts');
const { deleteContact } = require('../controllers/contacts/deleteContact');

const router = express.Router();

// get contacts
router.get('/all', getAllContacts);

// add contacts
router.post('/add', addContact);

// edit contacts
router.put('/edit/:id', editContact);

// delete contact
router.delete('/delete/:id', deleteContact);


module.exports = router;