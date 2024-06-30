const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Reminder = sequelize.define('Reminder', {
    reminderDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Reminder;
