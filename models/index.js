const { sequelize } = require('../config/database');
const User = require('./user');
const Application = require('./application');
const Reminder = require('./reminder');
const Company = require('./company');
const Job = require('./job');
const Note = require('./note');

// Define associations
User.hasMany(Application);
Application.belongsTo(User);
Application.hasMany(Reminder);
Reminder.belongsTo(Application);
Application.hasMany(Note);
Note.belongsTo(Application);
Company.hasMany(Job);
Job.belongsTo(Company);

const models = { User, Application, Reminder, Company, Job, Note, sequelize };

module.exports = models;
