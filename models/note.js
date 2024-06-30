const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Note = sequelize.define('Note', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Note;
