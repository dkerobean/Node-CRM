const { addNote } = require('../controllers/notes/addNote');
const { getAllNotes } = require('../controllers/notes/viewNotes');
const { editNote } = require('../controllers/notes/editNote');

const express = require('express');
const router = express.Router()


// add a note
router.post('/add', addNote);

// get all notes
router.get('/all', getAllNotes)

// edit notes
router.put('/edit/:noteId', editNote)


module.exports = router;