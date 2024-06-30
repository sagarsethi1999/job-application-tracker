const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Job = sequelize.define('Job', {
    jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    jobDescription: {
        type: DataTypes.TEXT,
    },
    notes: {
        type: DataTypes.TEXT,
    },
});

module.exports = Job;
