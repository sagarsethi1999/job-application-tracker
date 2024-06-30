const express = require('express');
const { addNote } = require('../controllers/noteController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/:id/notes', authMiddleware, addNote);

module.exports = router;
