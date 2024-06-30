const { Reminder } = require('../models');

const setReminder = async (req, res) => {
    const { applicationId, reminderDate } = req.body;
    try {
        const reminder = await Reminder.create({ applicationId, reminderDate });
        res.status(201).json({ message: 'Reminder set successfully', reminder });
    } catch (error) {
        res.status(500).json({ message: 'Error setting reminder', error });
    }
};

const getNotifications = async (req, res) => {
    try {
        const reminders = await Reminder.findAll({
            where: {
                reminderDate: {
                    [Sequelize.Op.gte]: new Date()
                }
            }
        });
        res.json({ reminders });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notifications', error });
    }
};

module.exports = { setReminder, getNotifications };
