const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Reminder = sequelize.define('Reminder', {
    applicationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    reminderDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Reminder;
