const express = require('express');
const { addContact } = require('../controllers/contacts/addContact');
const { editContact } = require('../controllers/contacts/editContact');
const { getAllContacts } = require('../controllers/contacts/allContacts');
const { deleteContact } = require('../controllers/contacts/deleteContact');
const { getContactById } = require('../controllers/contacts/viewContact');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API for managing contacts
 */

/**
 * @swagger
 * /api/contact/all:
 *   get:
 *     summary: Retrieve all contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Successfully retrieved all contacts
 *       500:
 *         description: Internal server error
 */
router.get('/all', getAllContacts);

/**
 * @swagger
 * /api/contact/add:
 *   post:
 *     summary: Add a new contact
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the contact
 *               email:
 *                 type: string
 *                 description: The email address of the contact
 *               phone:
 *                 type: string
 *                 description: The phone number of the contact
 *               organization:
 *                 type: string
 *                 description: The organization the contact belongs to
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Internal server error
 */
router.post('/add', addContact);

/**
 * @swagger
 * /api/contact/edit/{id}:
 *   put:
 *     summary: Edit an existing contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact to edit
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the contact
 *               email:
 *                 type: string
 *                 description: The email address of the contact
 *               phone:
 *                 type: string
 *                 description: The phone number of the contact
 *               organization:
 *                 type: string
 *                 description: The organization the contact belongs to
 *     responses:
 *       200:
 *         description: Contact edited successfully
 *       404:
 *         description: Contact not found
 *       400:
 *         description: Bad request, validation error
 *       500:
 *         description: Internal server error
 */
router.put('/edit/:id', editContact);

/**
 * @swagger
 * /api/contact/delete/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the contact to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id', deleteContact);

router.get('/view/:id', getContactById);

module.exports = router;
