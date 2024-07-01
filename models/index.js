const { sequelize } = require('../config/database');
const User = require('./user');
const Application = require('./application');
const Reminder = require('./reminder');
const Company = require('./company');
const Job = require('./job');


User.hasMany(Application);
Application.belongsTo(User);
User.hasMany(Reminder);
Reminder.belongsTo(User);
User.hasMany(Company);
Company.belongsTo(User);
User.hasMany(Job);
Job.belongsTo(User);

// Application.hasMany(Reminder);
// Reminder.belongsTo(Application);
// Application.hasMany(Note);
// Note.belongsTo(Application);
// Company.hasMany(Job);
// Job.belongsTo(Company);

const models = { User, Application, Reminder, Company, Job, sequelize };

module.exports = models;
