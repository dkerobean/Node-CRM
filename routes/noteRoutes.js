const { addNote } = require('../controllers/notes/addNote');
const { getAllNotes } = require('../controllers/notes/viewNotes');
const { editNote } = require('../controllers/notes/editNote');
const { deleteNote } = require('../controllers/notes/deleteNote');

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notes
 *   description: API for managing notes
 */

/**
 * @swagger
 * /api/notes/add:
 *   post:
 *     tags: [Notes]
 *     summary: Add a new note
 *     description: Create a new note associated with the authenticated user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Meeting Notes"
 *               description:
 *                 type: string
 *                 example: "Notes from the team meeting."
 *               label:
 *                 type: string
 *                 enum: [Work, Personal, Important]
 *                 example: "Work"
 *     responses:
 *       201:
 *         description: Note created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */

// add a note
router.post('/add', addNote);

/**
 * @swagger
 * /api/notes/all:
 *   get:
 *     tags: [Notes]
 *     summary: Get all notes
 *     description: Retrieve all notes associated with the authenticated user.
 *     responses:
 *       200:
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "670655e1eca537cd9eef6d21"
 *                   title:
 *                     type: string
 *                     example: "Meeting Notes"
 *                   description:
 *                     type: string
 *                     example: "Notes from the team meeting."
 *                   label:
 *                     type: string
 *                     enum: [Work, Personal, Important]
 *                     example: "Work"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-09T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-10-09T12:00:00Z"
 *       500:
 *         description: Server error
 */

// get all notes
router.get('/all', getAllNotes);

/**
 * @swagger
 * /api/notes/edit/{noteId}:
 *   put:
 *     tags: [Notes]
 *     summary: Edit an existing note
 *     description: Update the details of a specific note.
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: ID of the note to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Meeting Notes"
 *               description:
 *                 type: string
 *                 example: "Updated notes from the team meeting."
 *               label:
 *                 type: string
 *                 enum: [Work, Personal, Important]
 *                 example: "Work"
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */

// edit notes
router.put('/edit/:noteId', editNote);

/**
 * @swagger
 * /api/notes/delete/{noteId}:
 *   delete:
 *     tags: [Notes]
 *     summary: Delete a note
 *     description: Remove a specific note associated with the authenticated user.
 *     parameters:
 *       - in: path
 *         name: noteId
 *         required: true
 *         description: ID of the note to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       404:
 *         description: Note not found
 *       500:
 *         description: Server error
 */

// delete note
router.delete('/delete/:noteId', deleteNote);

module.exports = router;
