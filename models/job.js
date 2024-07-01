const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Job = sequelize.define('Job', {
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
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
