const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Company = sequelize.define('Company', {
    companyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'id' 
    },
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
