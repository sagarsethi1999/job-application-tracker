const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Company = sequelize.define('Company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contactDetails: {
        type: DataTypes.STRING,
    },
    companySize: {
        type: DataTypes.STRING,
    },
    industry: {
        type: DataTypes.STRING,
    },
    notes: {
        type: DataTypes.TEXT,
    },
});

module.exports = Company;
