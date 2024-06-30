const { Note } = require('../models');

const addNote = async (req, res) => {
    const { content } = req.body;
    const { id: applicationId } = req.params;
    try {
        const note = await Note.create({ content, applicationId });
        res.status(201).json({ message: 'Note added successfully', note });
    } catch (error) {
        res.status(500).json({ message: 'Error adding note', error });
    }
};

module.exports = { addNote };
